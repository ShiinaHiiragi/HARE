var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var db = require('../bin/db');
var api = require('../bin/api');
var CryptoJS = require('crypto-js');

router.post('/up', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageName', 'pagePresent'], res))
    .then(() => api.param(req.body, params, ['pageID', 'unitName'], res, api.ignore))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.checkRange(params.userID, {
      unit: params.unitID,
      page: params.pageID
    }, 1, res, true))
    .then(() => {
      const newUnit = Number(params.unitName !== undefined);
      const newPage = Number(params.pageID !== undefined);
      if (newUnit + newPage !== 1) throw 406;
      if (params.unitName !== undefined) {
        return db.newUnit(params.userID, params.unitID, params.unitName)
          .then(() => db.newPage(params.userID, params.unitID,
            1, params.pageName, params.pagePresent))
      } else return db.newPage(params.userID, params.unitID,
        params.pageID, params.pageName, params.pagePresent)
    })
    .then(() => api.noContent(res))
    .catch((err) => api.catchError(err, res));
});

router.post('/item', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID', 'itemID', 'query', 'key'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkRange(params.userID, {
      unit: params.unitID,
      page: params.pageID,
      item: params.itemID[0]
    }, 1, res, true))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.newItem(params.userID, params.unitID,
      params.pageID, params.itemID[0], params.query, params.key))
    .then((itemCreateTime) => res.send(itemCreateTime))
    .catch(() => api.internalServerError(res));
});

router.post('/image', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID', 'image', 'type'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.checkImage(params.userID, params.unitID, params.pageID, res))
    .then((imageID) => {
      let basicPath = path.join(__dirname, '../src/image');
      let avatarBase = params.image.replace(api.typeReg, '');
      let avatarBuffer = Buffer.from(avatarBase, 'base64');
      let tuple = CryptoJS.SHA1(new Date().toString()).toString();
      return new Promise((resolve, reject) => {
        fs.writeFile(
          path.join(basicPath, `${params.userID}_${tuple}${api.typeFormat(params.type)}`),
          avatarBuffer,
          (err) => { if (!err) resolve([imageID, avatarBuffer.length, tuple]); else reject(); }
        );
      });
    })
    .then(([imageID, byte, tuple]) => db.newImage(
      params.userID,
      params.unitID,
      params.pageID,
      imageID,
      `${tuple}${api.typeFormat(params.type)}`,
      byte >> 10
    ))
    .then((out) => res.send(out))
    .catch(() => api.internalServerError(res));
});

module.exports = router;
