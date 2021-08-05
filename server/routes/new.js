var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var api = require('../bin/api');

router.post('/up', (req, res) => {
  const params = new Object();
  console.log(req.body);
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

module.exports = router;
