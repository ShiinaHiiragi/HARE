var express = require('express');
var path = require('path');
var fs = require('fs');
var db = require('../bin/db');
var api = require('../bin/api');
var router = express.Router();

// get a number randomly in [sub, sup];
const dice = (sub, sup) => {
  return Math.round(Math.random() * (sup - sub) + sub)
}

router.get('/cover', (req, res) => {
  fs.readdir(path.join(__dirname, '../src/cover'), (err, dir) => {
    if (err) api.internalServerError(res);
    else {
      const sup = dir.length - 1;
      const retImage = dir[dice(0, sup)]
      res.sendFile(path.join(__dirname, `../src/cover/${retImage}`));
    }
  });
});

const adminID = 1;
router.get('/about', (req, res) => {
  db.getAvatarExtent(adminID)
    .then((out) => res.sendFile(path.join(
        __dirname,
        `../src/avatar/${adminID}${out[0].avatar}`
    )))
    .catch(() => api.internalServerError(res));
});

router.get('/avatar', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.getAvatarExtent(params.userID))
    .then((out) => res.sendFile(path.join(
        __dirname,
        `../src/avatar/${params.userID}${out[0].avatar}`
    )))
    .catch(() => api.internalServerError(res));
});

router.get('/image', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => api.param(req.query, params, ['unitID', 'pageID', 'imageID'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.getImageExtent(params.userID, params.unitID, params.pageID, params.imageID))
    .then((out) => {
      res.sendFile(path.join(
        __dirname,
        `../src/image/${params.userID}i${out[0].imagetype}`
      ))
    })
    .catch(() => api.internalServerError(res));
});

module.exports = router;
