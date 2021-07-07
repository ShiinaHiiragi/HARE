var express = require('express');
var SHA1 = require('crypto-js').SHA1;
var db = require('../bin/db');
var router = express.Router();

router.get('/check', (req, res) => {
  const userID = req.query.userID === "undefined" ? "0" : req.query.userID;
  db.checkToken(userID, req.query.token, res)
    .then(() => db.updateToken(userID).then(() => res.send("HARE")));
});

router.post('/sign', (req, res) => {
  db.query(`select userID from userInfo natural join userSetting
    where email = '${req.body.email}' and password = '${req.body.password}'`)
    .then(out => {
      const token = SHA1(req.body.email + new Date().toString()).toString();
      if (out.length > 0) {
        db.newToken(out[0].userid, token).then(() =>
          res.send({ uid: out[0].userid, token: token }));
      } else res.status(401).send("Incorrect E-mail or password.");
    }).catch((err) => res.status(500).send(err.toString()));
});

router.post('/logout', (req, res) => {
  db.checkToken(req.body.userID, req.body.token)
    .then(() => db.query(`delete from onlineUser where userID = ${req.body.userID}`));
});

router.get('/unit', (req, res) => {
  const {userID, token} = req.query;
  db.checkToken(userID, token, res).then(() => {
    db.getUnitPage(userID)
      .then(out => res.send(out))
      .catch(err => res.status(500).send(err));
  });
});

module.exports = router;
