var express = require('express');
var SHA1 = require('crypto-js').SHA1;
var db = require('../bin/db');
var api = require('../bin/api');
var router = express.Router();

router.get('/check', (req, res) => {
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID } = api.sqlNumber(req.query, ['userID'], res);
  // if (!(userID && token)) return;
  const { userID, token } = req.cookies;

  db.checkToken(userID, token, res)
    .then(() => res.send('HARE'));
});

router.post('/sign', (req, res) => {
  // const { email, password } = api.sqlString(req.body, ['email', 'password'], res);
  // if (!(email && password)) return;
  const { email, password } = req.body;

  db.query(`select userID from userInfo natural join userSetting
    where email = '${email}' and password = '${password}'`)
    .then(out => {
      const token = SHA1(email + new Date().toString()).toString();
      if (out.length > 0) {
        db.newToken(out[0].userid, token).then(() =>
          res.send({ uid: out[0].userid, token: token }));
      } else res.status(403).send('Incorrect E-mail or password.');
    }).catch(() => api.internalServerError(res));
});

router.post('/logout', (req, res) => {
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID } = api.sqlNumber(req.body, ['userID'], res);
  // if (!(userID && token)) return;
  const { userID, token } = req.cookies;

  db.checkToken(userID, token, res)
    .then(() => db.query(`delete from onlineUser where userID = ${userID}`))
    .then(() => api.noContent(res));
});

router.get('/profile', (req, res) => {
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID } = api.sqlNumber(req.query, ['userID'], res);
  // if (!(userID && token)) return;
  const { userID, token } = req.cookies;

  db.checkToken(userID, token, res)
    .then(() => db.getProfile(userID))
    .then(out => res.send(out[0]))
    .catch(() => api.internalServerError(res));
});

router.get('/unit', (req, res) => {
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID } = api.sqlNumber(req.query, ['userID'], res);
  // if (!(userID && token)) return;
  const { userID, token } = req.cookies;

  db.checkToken(userID, token, res)
    .then(() => db.getUnitPage(userID))
    .then(out => res.send(out))
    .catch(() => api.internalServerError(res));
});

router.get('/page', (req, res) => {
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID, unitID, pageID } = api.sqlNumber(
  //   req.query,
  //   ['userID', 'unitID', 'pageID'],
  //   res
  // );
  // if (!(userID && token)) return;
  const { userID, token } = req.cookies;
  const { unitID, pageID } = req.body;

  db.checkToken(userID, token, res)
    .then(() => db.getPageDetail(userID, unitID, pageID))
    .then((out) => res.send(out[0]))
    .catch(() => api.internalServerError(res));
});

router.get('/item', (req, res) => {
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID, unitID, pageID } = api.sqlNumber(
  //   req.query,
  //   ['userID', 'unitID', 'pageID'],
  //   res
  // );
  // if (!(userID && token)) return;
  const { userID, token } = req.cookies;
  const { unitID, pageID } = req.body;

  db.checkToken(userID, token, res)
    .then(() => db.getItem(userID, unitID, pageID))
    .then((out) => res.send(out.map((each) => {
      let initialObject = {
        id: each.itemid,
        query: each.itemquery,
        key: each.itemkey,
        time: each.itemcreatetime,
      };
      if (each.itemrecord)
        return each.itemrecord.reduce((obj, value, index) => {
          obj[index + 1] = value
          return obj;
        }, initialObject);
      else return initialObject;
    })))
    .catch(() => api.internalServerError(res));
});

router.get('/stat', (req, res) => {
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID, unitID, pageID } = api.sqlNumber(req.query, ['userID', 'unitID', 'pageID'], res);
  // if (!(userID && token)) return;
  const { userID, token } = req.cookies;
  const { unitID, pageID } = req.body;

  db.checkToken(userID, token, res)
    .then(() => db.getStat(userID, unitID, pageID))
    .then((out) => res.send(out))
    .catch(() => api.internalServerError(res));
});

router.post('/this', (req, res) => {
  // const clear = !!req.body.clear;
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID, unitID, pageID } = api.sqlNumber(
  //   req.body,
  //   ['userID', 'unitID', 'pageID'],
  //   res
  // );
  // if (!(userID && token)) return;
  const { userID, token } = req.cookies;
  const { unitID, pageID, bool } = req.body;

  db.checkToken(userID, token, res)
    .then(() => db.getThis(userID, unitID, pageID, bool))
    .then((out) => res.send(out))
    .catch(() => api.internalServerError(res));
});

module.exports = router;
