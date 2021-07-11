var express = require('express');
var SHA1 = require('crypto-js').SHA1;
var db = require('../bin/db');
var api = require('../bin/api');
var router = express.Router();

router.get('/check', (req, res) => {
  const { userID } = api.sqlNumber(req.query, ["userID"], res);
  const { token } = api.sqlString(req.query, ["token"], res);
  db.checkToken(userID, token, res)
    .then(() => db.updateToken(userID).then(() => res.send("HARE")));
});

router.post('/sign', (req, res) => {
  const { email, password } = api.sqlString(req.body, ["email", "password"], res);
  db.query(`select userID from userInfo natural join userSetting
    where email = '${email}' and password = '${password}'`)
    .then(out => {
      const token = SHA1(email + new Date().toString()).toString();
      if (out.length > 0) {
        db.newToken(out[0].userid, token).then(() =>
          res.send({ uid: out[0].userid, token: token }));
      } else res.status(401).send("Incorrect E-mail or password.");
    }).catch(() => api.internalServerError(res));
});

router.post('/logout', (req) => {
  const { userID } = api.sqlNumber(req.body, ["userID"], res);
  const { token } = api.sqlString(req.body, ["token"], res);
  db.checkToken(userID, token)
    .then(() => db.query(`delete from onlineUser where userID = ${userID}`));
});

router.get('/unit', (req, res) => {
  const { userID } = api.sqlNumber(req.query, ["userID"], res);
  const { token } = api.sqlString(req.query, ["token"], res);
  db.checkToken(userID, token, res).then(() => {
    db.getUnitPage(userID)
      .then(out => res.send(out))
      .catch(() => api.internalServerError(res));
  });
});

router.get('/page', (req, res) => {
  const { userID, unitID, pageID } = api.sqlNumber(
    req.query,
    ["userID", "unitID", "pageID"],
    res
  );
  const { token } = api.sqlString(req.query, ["token"], res);
  db.checkToken(userID, token, res).then(() => {
    db.getPageDetail(userID, unitID, pageID)
      .then(out => res.send(out[0]))
      .catch(() => api.internalServerError(res));
  });
});

router.get('/profile', (req, res) => {
  const { userID } = api.sqlNumber(req.query, ["userID"], res);
  const { token } = api.sqlString(req.query, ["token"], res);
  db.checkToken(userID, token, res).then(() => {
    db.getProfile(userID)
      .then(out => res.send(out[0]))
      .catch(() => api.internalServerError(res));
  });
});

module.exports = router;
