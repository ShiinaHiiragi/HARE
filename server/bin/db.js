const Pool = require('pg').Pool
const fs = require('fs');
const path = require('path');

const poolSetting = JSON.parse(fs.readFileSync(path.join(__dirname, './setting.json')));
const pool = new Pool(poolSetting);

exports.query = (sql) => new Promise((resolve, reject) => {
  pool.query(sql, (err, res) => {
    if (err) reject(err);
    else resolve(res.rows);
  });
});

exports.init = (clearAll) => new Promise((resolve, reject) => {
  
});