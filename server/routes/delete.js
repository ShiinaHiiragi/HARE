var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var db = require('../bin/db');
var api = require('../bin/api');

router.post('/up', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID'], res))
    .then(() => api.param(req.body, params, ['pageID'], res, api.ignore))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => {
      if (params.pageID === undefined) {
        db.deleteUnit(params.userID, params.unitID)
          .then(() => res.send('unit'))
          .catch(() => api.internalServerError(res));
      } else {
        db.deletePage(params.userID, params.unitID, params.pageID)
          .then((out) => {
            if (!out[0].pagesize) {
              db.deleteUnit(params.userID, params.unitID)
                .then(() => res.send('unit'))
                .catch(() => api.internalServerError(res));
            } else res.send('page');
          })
          .catch(() => api.internalServerError(res));
      }
    });
});

router.post('/item', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID', 'itemID'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.deleteItem(params.userID, params.unitID, params.pageID, params.itemID))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

router.post('/track', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID', 'trackID'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.deleteStat(params.userID, params.unitID, params.pageID, params.trackID))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

router.post('/image', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID', 'imageID'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.getImageExtent(params.userID, params.unitID, params.pageID, params.imageID))
    .then((out) => {
      fs.unlinkSync(path.join(
        __dirname,
        `../src/image/${params.userID}i${out[0].imagetype}`
        ));
    })
    .then(() => db.deleteImage(params.userID, params.unitID, params.pageID, params.imageID))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

module.exports = router;
