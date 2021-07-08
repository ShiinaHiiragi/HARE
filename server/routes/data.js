var express = require('express');
var SHA1 = require('crypto-js').SHA1;
var db = require('../bin/db');
var router = express.Router();

router.get('/check', (req, res) => {
  const { userID, token } = req.query;
  // the userID is string from get
  // transforming to number to avoid SQL injection
  const userIDNumber = isNaN(Number(userID)) ? 0 : Number(userID);
  db.checkToken(userIDNumber, token, res)
    .then(() => db.updateToken(userIDNumber).then(() => res.send("HARE")));
});

router.post('/sign', (req, res) => {
  const { email, password } = req.body;
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
  const { userID, token } = req.body;
  db.checkToken(userID, token)
    .then(() => db.query(`delete from onlineUser where userID = ${userID}`));
});

router.get('/unit', (req, res) => {
  const { userID, token } = req.query;
  const userIDNumber = isNaN(Number(userID)) ? 0 : Number(userID);
  db.checkToken(userIDNumber, token, res).then(() => {
    db.getUnitPage(userIDNumber)
      .then(out => res.send(out))
      .catch(err => res.status(500).send(err));
  });
});

module.exports = router;
