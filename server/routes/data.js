var express = require('express');
var SHA1 = require('crypto-js').SHA1;
var query = require('../bin/db').query;
var newToken = require('../bin/db').newToken;
var updateToken = require('../bin/db').updateToken;
var checkToken = require('../bin/db').checkToken;
var router = express.Router();

router.get('/check', (req, res) => {
  const userID = req.query.userID === "undefined" ? "0" : req.query.userID;
  checkToken(res, userID, req.query.token)
    .then(() => updateToken(userID).then(() => res.send("HARE")));
  // query(`select * from onlineUser
  //   where userID = ${userID} and token = '${req.query.token}'`)
  //   .then(out => {
  //     if (out.length === 0)
  //       res.status(401).send("INVALID");
  //     else if (new Date() - new Date(out[0].lasttime) > tokenLifeSpan)
  //       res.status(401).send("EXPIRED");
  //     else updateToken(userID).then(() => res.send("HARE"));
  //   }).catch((err) => res.status(500).send(err.toString()));
});

router.get('/sign', (req, res) => {
  query(`select userID from userInfo natural join userSetting
    where email = '${req.query.email}' and password = '${req.query.password}'`)
    .then(out => {
      const token = SHA1(req.query.email + new Date().toString()).toString();
      if (out.length > 0) {
        newToken(out[0].userid, token).then(() =>
          res.send({ uid: out[0].userid, token: token }));
      } else res.status(401).send("Incorrect E-mail or password.");
    }).catch((err) => res.status(500).send(err.toString()));
});

router.get('/pages', (req, res) => {

});

module.exports = router;
