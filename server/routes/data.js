var express = require('express');
var SHA1 = require('crypto-js').SHA1;
var db = require('../bin/db');
var api = require('../bin/api');
var router = express.Router();

router.get('/check', (req, res) => {
  const { userID } = api.sqlNumber(req.query, ["userID"]);
  const { token } = api.sqlString(req.query, ["token"]);
  db.checkToken(userID, token, res)
    .then(() => db.updateToken(userID).then(() => res.send("HARE")));
});

router.post('/sign', (req, res) => {
  const { email, password } = api.sqlString(req.body, ["email", "password"]);
  db.query(`select userID from userInfo natural join userSetting
    where email = '${email}' and password = '${password}'`)
    .then(out => {
      const token = SHA1(email + new Date().toString()).toString();
      if (out.length > 0) {
        db.newToken(out[0].userid, token).then(() =>
          res.send({ uid: out[0].userid, token: token }));
      } else res.status(401).send("Incorrect E-mail or password.");
    }).catch((err) => res.status(500).send(err.toString()));
});

router.post('/logout', (req) => {
  const { userID } = api.sqlNumber(req.body, ["userID"]);
  const { token } = api.sqlString(req.body, ["token"]);
  db.checkToken(userID, token)
    .then(() => db.query(`delete from onlineUser where userID = ${userID}`));
});

router.get('/unit', (req, res) => {
  const { userID } = api.sqlNumber(req.query, ["userID"]);
  const { token } = api.sqlString(req.query, ["token"]);
  const userIDNumber = isNaN(Number(userID)) ? 0 : Number(userID);
  db.checkToken(userIDNumber, token, res).then(() => {
    db.getUnitPage(userIDNumber)
      .then(out => res.send(out))
      .catch(err => res.status(500).send(err));
  });
});

module.exports = router;
