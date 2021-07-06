const Pool = require('pg').Pool
const fs = require('fs');
const path = require('path');
const api = require('./api');

const tokenLifeSpan = 24 * 3600 * 1000;
const setting = JSON.parse(fs.readFileSync(path.join(__dirname, './setting.json')))
const pool = new Pool(setting.poolSetting);
const query = (sql) => new Promise((resolve, reject) => {
  pool.query(sql, (err, res) => {
    if (err) reject(err);
    else resolve(res.rows);
  });
});

exports.dbInitialize = (clearAll) => new Promise((resolve, reject) => {
  const newTable = () => {
    const schemaSQL = Object.values(setting.schema).map(item => item.join(' '));
    api.syncEachChain(schemaSQL, (item, onsuccess, onerror) => {
      query(item).then(onsuccess).catch(onerror);
    });
  }
  if (clearAll) {
    const schemas = Object.keys(setting.schema).reverse();
    api.syncEachChain(schemas, (item, onsuccess, onerror) => {
      query(`drop table if exists ${item}`)
        .then(onsuccess).catch(onerror);
    }).then(newTable);
  } else newTable();
});

const insertUser = (cmdLine, onsuccess, onerror) => {
  let returnUserID;
  query(`insert into userInfo(email)
    values('${cmdLine[1]}')
    returning userID`)
    .then((res) => {
      returnUserID = res[0].userid;
      return query(`insert into userSetting(userID, username, password, gender)
        values(${returnUserID}, '${cmdLine[2]}', '${cmdLine[3]}', 'U')`)
    }).then(() => {
      console.log(`INSERT userID: ${returnUserID}`);
      onsuccess();
    }).catch(err => onerror(err));
}

const newToken = (userID, token) => new Promise((resolve, reject) => {
  if (token)
    query(`insert into onlineUser(userID, token, lastTime)
      values(${userID}, '${token}', now())
      on conflict (userID) do update
      set token = EXCLUDED.token, lastTime = EXCLUDED.lastTime`)
      .then(resolve).catch(err => reject(err));
  else
    query(`insert into onlineUser(userID, token, lastTime)
      values(${userID}, '', now())
      on conflict (userID) do update
      set lastTime = EXCLUDED.lastTime`)
      .then(resolve).catch(err => reject(err));
})

exports.exec = (cmdLine) => new Promise((resolve, reject) => {
  if (cmdLine[0] === '') cmdLine.shift();
  if (cmdLine[cmdLine.length - 1] === '') cmdLine.pop();
  if (cmdLine[0] === 'sign') {
    api.checkRegister(cmdLine)
      .then((newLine) => insertUser(newLine, resolve, reject))
      .catch(err => reject(err));
  } else reject('ERROR: cannot parse the command.');
});

exports.query = query;
exports.newToken = newToken;
exports.updateToken = (userID) => newToken(userID);
exports.checkToken = (userID, token, res) => new Promise((resolve) => 
  query(`select * from onlineUser
    where userID = ${userID} and token = '${token}'`)
    .then(out => {
      if (out.length === 0) {
        if (res) res.status(401).send("INVALID");
      } else if (new Date() - new Date(out[0].lasttime) > tokenLifeSpan) {
        if (res) res.status(401).send("EXPIRED");
      } else resolve();
    }).catch((err) => {
      if (res) res.status(500).send(err.toString())
    })
)