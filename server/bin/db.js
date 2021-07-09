const Pool = require('pg').Pool
const fs = require('fs');
const path = require('path');
const api = require('./api');

const tokenLifeSpan = 24 * 3600 * 1000;
const setting = JSON.parse(fs.readFileSync(path.join(__dirname, './setting.json')))
const pool = new Pool(setting.poolSetting);

// db inner api
const query = (sql) => new Promise((resolve, reject) => {
  pool.query(sql, (err, res) => {
    if (err) reject(err);
    else resolve(res.rows);
  });
});
exports.query = query;

// db api for server init and command
exports.dbInitialize = (clearAll) => new Promise((resolve, reject) => {
  const newTable = () => {
    const schemaSQL = Object.values(setting.schema).map(item => item.join(' '));
    api.syncEachChain(schemaSQL, (item, onsuccess, onerror) => {
      query(item).then(onsuccess).catch(onerror);
    }).then(resolve).catch(reject);
  }
  if (clearAll) {
    const schemas = Object.keys(setting.schema).reverse();
    api.syncEachChain(schemas, (item, onsuccess, onerror) => {
      query(`drop table if exists ${item}`)
        .then(onsuccess).catch(onerror);
    }).then(newTable);
  } else newTable();
});

exports.exec = (cmdLine) => new Promise((resolve, reject) => {
  if (cmdLine[0] === '') cmdLine.shift();
  if (cmdLine[cmdLine.length - 1] === '') cmdLine.pop();
  if (cmdLine[0] === 'sign') {
    api.checkRegister(cmdLine)
      .then((newLine) => insertUser(newLine, resolve, reject))
      .catch(reject);
  } else if (cmdLine[0] === 'view') {
    viewTable(cmdLine, resolve, reject);
  } else reject('ERROR: cannot parse the command.');
});

const insertUser = (cmdLine, onsuccess, onerror) => {
  let returnUserID;
  query(`insert into userInfo(email)
    values('${cmdLine[1]}')
    returning userID`)
    .then((res) => {
      returnUserID = res[0].userid;
      return query(`insert into userSetting(userID, username, password)
        values(${returnUserID}, '${cmdLine[2]}', '${cmdLine[3]}')`)
    }).then(() => {
      console.log(`INSERT userID: ${returnUserID}`);
      onsuccess();
    }).catch(onerror);
}

const viewTable = (cmdLine, onsuccess, onerror) => {
  if (Object.keys(setting.schema).find((item) => item === cmdLine[1]))
    query(`select * from ${cmdLine[1]}`).then((out) => {
      console.log(out);
      onsuccess(out);
    }).catch(onerror)
  else onerror('ERROR: Nonexistent schema.');
}

// db api for profile and token request
exports.profile = (userID) => new Promise((resolve, reject) => 
  query(`select userName, userID, email, gender, birth, city, tel
    from userSetting natural join userInfo where userID = ${userID}`)
    .then(resolve).catch(reject)
);

exports.checkToken = (userID, token, res) => new Promise((resolve) => 
  query(`select * from onlineUser
    where userID = ${userID} and token = '${token}'`)
    .then(out => {
      if (out.length === 0) {
        if (res) res.status(401).send("INVALID");
      } else if (new Date() - new Date(out[0].lasttime) > tokenLifeSpan) {
        if (res) res.status(401).send("EXPIRED");
      } else resolve();
    }).catch(() => {
      if (res) api.internalServerError(res)
    })
)

const newToken = (userID, token) => new Promise((resolve, reject) => {
  if (token)
    query(`insert into onlineUser(userID, token, lastTime)
      values(${userID}, '${token}', now())
      on conflict (userID) do update
      set token = EXCLUDED.token, lastTime = EXCLUDED.lastTime`)
      .then(resolve).catch(reject);
  else
    query(`insert into onlineUser(userID, token, lastTime)
      values(${userID}, '', now())
      on conflict (userID) do update
      set lastTime = EXCLUDED.lastTime`)
      .then(resolve).catch(reject);
})
exports.newToken = newToken;
exports.updateToken = (userID) => newToken(userID);

// db api for client menu get or post
exports.getUnitPage = (userID) => new Promise((resolve, reject) => {
  query(`select unitID, unitName from unit
    where userID = ${userID} order by unitID asc`)
    .then((out) => {
      return out.map((item) => ({
        unitID: item.unitid,
        unitName: item.unitname,
        open: item.unitid === 1 ? true : false,
        pages: []
    }))}
    ).then((listItem) => {
      api.syncEachChain(listItem, (item, onsuccess, onerror) => {
        query(`select pageID, pageName, pageCover, pagePresent from page
          where userID = ${userID} and unitID = ${item.unitID} order by pageID asc`)
          .then((out) => {
            item.pages = out.map((subItem) => ({
              selected: false,
              pageID: subItem.pageid,
              pageName: subItem.pagename,
              pageCover: subItem.pagecover,
              pagePresent: subItem.pagepresent
            }))
            onsuccess();
          }).catch(onerror);
      }).then(() => resolve(listItem)).catch(reject);
    }).catch(reject);
});

exports.newUnit = (userID, unitID, unitName) => new Promise((resolve, reject) => {
  query(`begin;
    update unit set unitID = -unitID - 1 where userID = ${userID} and unitID >= ${unitID};
    update unit set unitID = -unitID where userID = ${userID} and unitID < 0;
    update userSetting set unitSize = unitSize + 1 where userID = ${userID};
    insert into unit(userID, unitID, unitName, unitCreateTime)
    values(${userID}, ${unitID}, '${unitName}', now()); commit;`)
    .then(resolve).catch(reject);
});

exports.newPage = (userID, unitID, pageID, pageName, pagePresent) => 
  new Promise((resolve, reject) => {
    query(`begin; update page set pageID = -pageID - 1
      where userID = ${userID} and unitID = ${unitID} and pageID >= ${pageID};
      update page set pageID = -pageID
      where userID = ${userID} and unitID = ${unitID} and pageID < 0;
      update unit set pageSize = pageSize + 1
      where userID = ${userID} and unitID = ${unitID};
      insert into page(userID, unitID, pageID, pageName, pagePresent, pageCreateTime)
      values(${userID}, ${unitID}, ${pageID}, '${pageName}', '${pagePresent}', now());
      commit;`).then(resolve).catch(reject);
});

exports.moveUnit = (userID, less) => new Promise((resolve, reject) => {
  query(`begin; update unit set unitID = ${-less - 1}
    where userID = ${userID} and unitID = ${less};
    update unit set unitID = ${-less}
    where userID = ${userID} and unitID = ${less + 1};
    update unit set unitID = -unitID
    where userID = ${userID} and (unitID = ${-less} or unitID = ${-less - 1});
    commit;`).then(resolve).catch(reject);
});

exports.movePage = (userID, unitID, less) => new Promise((resolve, reject) => {
  query(`begin; update page set pageID = ${-less - 1}
    where userID = ${userID} and unitID = ${unitID} and pageID = ${less};
    update page set pageID = ${-less}
    where userID = ${userID} and unitID = ${unitID} and pageID = ${less + 1};
    update page set pageID = -pageID
    where userID = ${userID} and unitID = ${unitID} and (
    pageID = ${-less} or pageID = ${-less - 1}); commit;`)
    .then(resolve).catch(reject);
});

exports.deleteUnit = (userID, unitID) => new Promise((resolve, reject) => {
  query(`begin; delete from unit where userID = ${userID} and unitID = ${unitID};
    update userSetting set unitSize = unitSize - 1 where userID = ${userID};
    update unit set unitID = 1 - unitID
    where userID = ${userID} and unitID > ${unitID};
    update unit set unitID = -unitID
    where userID = ${userID} and unitID < 0; commit;`)
    .then(resolve).catch(reject);
});

exports.deletePage = (userID, unitID, pageID) => new Promise((resolve, reject) => {
  query(`begin; delete from page
    where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID};
    update unit set pageSize = pageSize - 1
    where userID = ${userID} and unitID = ${unitID};
    update page set pageID = 1 - pageID
    where userID = ${userID} and unitID = ${unitID} and pageID > ${pageID};
    update page set pageID = -pageID
    where userID = ${userID} and unitID = ${unitID} and pageID < 0;
    commit;`)
    .then(() => query(`select pageSize from unit
      where userID = ${userID} and unitID = ${unitID}`))
    .then(resolve).catch(reject);
});

exports.editUnit = (userID, unitID, unitName) => new Promise((resolve, reject) => {
  query(`update unit set unitName = '${unitName}'
    where userID = ${userID} and unitID = ${unitID}`)
    .then(resolve).catch(reject);
});