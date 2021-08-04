var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var api = require('../bin/api');

router.post('/up', (req, res) => {
  // const bool = !!req.body.bool;
  // const type = api.sqlNumberArray(req.body.type);
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID } = api.sqlNumber(req.body, ['userID'], res);
  // const { unitName, pageName, pagePresent } = api.sqlString(
  //   req.body,
  //   ['unitName', 'pageName', 'pagePresent'],
  //   res
  // );
  // if (!(userID && token && unitName !== undefined)) return;
  // if (!(unitName && pageName)) {
  //   api.invalidArgument(res);
  //   return;
  // }
  // if ((bool && typeof type !== 'number') ||
  //   (!bool && (!(type instanceof Array) || type.length !== 2))) {
  //   api.invalidArgument(res);
  //   return;
  // }
  const { userID, token } = req.cookies;
  const { unitName, pageName, pagePresent, type, bool } = req.body;

  db.checkToken(userID, token, res)
    .then(() => {
      if (bool) {
        // the feature of OR in js
        db.newUnit(userID, type || 1, unitName)
          .then(() => db.newPage(userID, type || 1, 1, pageName, pagePresent))
          .then(() => api.noContent(res))
          .catch(() => api.internalServerError(res));
      } else {
        db.newPage(userID, type[0], type[1], pageName, pagePresent)
          .then(() => api.noContent(res))
          .catch(() => api.internalServerError(res));
      }
    });
});

router.post('/item', (req, res) => {
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID, unitID, pageID, itemID } = api.sqlNumber(
  //   req.body,
  //   ['userID', 'unitID', 'pageID', 'itemID'],
  //   res
  // );
  // const { query, key } = api.sqlString(req.body, ['query', 'key'], res);
  // if (!(userID && token && query !== undefined)) return;
  const { userID, token } = req.cookies;
  const { unitID, pageID, itemID } = req.body;

  db.checkToken(userID, token, res)
    .then(() => db.newItem(userID, unitID, pageID, itemID[0], query, key))
    .then((itemCreateTime) => res.send(itemCreateTime))
    .catch(() => api.internalServerError(res));
});

module.exports = router;
