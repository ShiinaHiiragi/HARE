const Pool = require('pg').Pool
const fs = require('fs');
const path = require('path');

const setting = JSON.parse(fs.readFileSync(path.join(__dirname, './setting.json')))
const pool = new Pool(setting.poolSetting);
const wrapQuery = (sql) => new Promise((resolve, reject) => {
  pool.query(sql, (err, res) => {
    if (err) reject(err);
    else resolve(res.rows);
  });
});
const syncEachChain = (arrayObject, eachTemp) =>
arrayObject.reduce(
  (promiseChain, arrayItem) =>
    promiseChain.then(() => new Promise((resolve, reject) =>
      eachTemp(arrayItem, resolve, reject))),
  Promise.resolve()
);

exports.query = wrapQuery;
exports.syncEachChain = syncEachChain;
exports.dbInitialize = (clearAll) => new Promise((resolve, reject) => {
  const newTable = () => {
    const schemaSQL = Object.values(setting.schema).map(item => item.join(' '));
    syncEachChain(schemaSQL, (item, onsuccess, onerror) => {
      wrapQuery(item).then(onsuccess).catch(onerror);
    });
  }
  if (clearAll) {
    const schemas = Object.keys(setting.schema).reverse();
    syncEachChain(schemas, (item, onsuccess, onerror) => {
      wrapQuery(`drop table if exists ${item}`)
        .then(onsuccess).catch(onerror);
    }).then(newTable);
  } else newTable();
});

exports.exec = (cmdLine) => new Promise((resolve, reject) => {
  if (cmdLine[0] === '') cmdLine.shift();
  if (cmdLine[cmdLine.length - 1] === '') cmdLine.pop();
  if (cmdLine[0] === 'sign') {
    if (cmdLine.length < 4) {
      reject('ERROR: too few arguments.\n  Try using sign <email> <username> <password>');
    } else {
      let returnUserID;
      wrapQuery(`insert into userInfo(email)
        values('${cmdLine[1]}')
        returning userID`)
        .then((res) => {
          returnUserID = res[0].userid;
          return wrapQuery(`insert into userSetting(userID, username, password, gender)
            values(${returnUserID}, '${cmdLine[2]}', '${cmdLine[3]}', 'U')`)
        }).then(() => {
          console.log(`INSERT userID: ${returnUserID}`);
          resolve();
        }).catch(err => reject(err));
    }
  } else reject('ERROR: cannot parse the command.');
})
