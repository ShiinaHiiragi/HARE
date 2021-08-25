var express = require('express');
var SHA512 = require('crypto-js').SHA512;
var SHA256 = require('crypto-js').SHA256;
var db = require('../bin/db');
var api = require('../bin/api');
var router = express.Router();

router.get('/check', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.updateSession(params.userID))
    .then((session) => res.send(session));
});

router.post('/sign', (req, res) => {
  const params = new Object();
  api.param(req.body, params, ['email', 'password'], res)
    .then(() => db.query(`select userID from userInfo natural join userSetting
      where email = '${params.email}' and password = '${params.password}'`))
    .then((out) => {
      const token = SHA512(params.email + params.password + new Date().toISOString()).toString();
      const session = SHA256(new Date().toISOString()).toString();
      if (out.length > 0) {
        db.newToken(out[0].userid, token, session)
          .then(() => res.send({ uid: out[0].userid, token: token, session: session }));
      } else api.forbidden(res, 'Incorrect E-mail or password.');
    })
    .catch(() => api.internalServerError(res));
});

router.post('/logout', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.query(`delete from onlineUser where userID = ${params.userID}`))
    .then(() => api.noContent(res));
});

router.get('/profile', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.getProfile(params.userID))
    .then((out) => res.send(out[0]))
    .catch(() => api.internalServerError(res));
});

router.get('/unit', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.getUnit(params.userID))
    .then((out) => res.send(out))
    .catch(() => api.internalServerError(res));
});

router.get('/page', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => api.param(req.query, params, ['unitID', 'pageID'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.getPage(params.userID, params.unitID, params.pageID))
    .then((out) => res.send(out[0]))
    .catch(() => api.internalServerError(res));
});

router.get('/item', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => api.param(req.query, params, ['unitID', 'pageID'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.getItem(params.userID, params.unitID, params.pageID))
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
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => api.param(req.query, params, ['unitID', 'pageID'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.getStat(params.userID, params.unitID, params.pageID))
    .then((out) => res.send(out))
    .catch(() => api.internalServerError(res));
});

router.post('/this', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID'], res))
    .then(() => api.param(req.body, params, ['bool'], res, api.ignore))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.getThis(params.userID, params.unitID, params.pageID, params.bool))
    .then((out) => res.send(out))
    .catch((err) => api.catchError(err, res));
});

router.get('/image', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => api.param(req.query, params, ['unitID', 'pageID'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => res.send([
      { id: 1, title: "FIRST", time: "2021-08-25T15:40:45.414Z", size: 175 },
      { id: 2, title: "SECOND", time: "2021-08-25T15:40:51.138Z", size: 854 },
      { id: 3, title: "THIRD", time: "2021-08-25T15:40:58.728Z", size: 2 },
      { id: 4, title: "TITLE", time: "2021-08-25T15:41:07.012Z", size: 119 },
      { id: 5, title: "ALSO TITLE", time: "2021-08-25T15:41:13.775Z", size: 469 },
      { id: 6, title: "STILL TITLE", time: "2021-08-25T15:41:22.737Z", size: 920 },
      { id: 7, title: "NAME HAHAHA", time: "2021-08-25T15:41:29.763Z", size: 47 }
    ]))
    .catch((err) => api.catchError(err, res));
});

module.exports = router;
