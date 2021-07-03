const Pool = require('pg').Pool
const fs = require('fs');
const path = require('path');
const syncEachChain = require('./interface').syncEachChain;

const setting = JSON.parse(fs.readFileSync(path.join(__dirname, './setting.json')))
const pool = new Pool(setting.poolSetting);
const outerQuery = (sql) => new Promise((resolve, reject) => {
  pool.query(sql, (err, res) => {
    if (err) reject(err);
    else resolve(res.rows);
  });
});

exports.query = outerQuery;
exports.dbInitialize = (clearAll) => new Promise((resolve, reject) => {
  const newTable = () => {
    const schemaSQL = Object.values(setting.schema).map(item => item.join(' '));
    syncEachChain(schemaSQL, (item, onsuccess, onerror) => {
      outerQuery(item).then(onsuccess).catch(onerror);
    });
  }
  if (clearAll) {
    const schemas = Object.keys(setting.schema).reverse();
    syncEachChain(schemas, (item, onsuccess, onerror) => {
      outerQuery(`drop table if exists ${item}`)
        .then(onsuccess)
        .catch(onerror);
    }).then(newTable);
  } else newTable();
});
