var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var api = require('../bin/api');

router.post('/up', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => api.param(req.body, params, ['unitID'], res))
    .then(() => api.param(req.body, params, ['pageID'], res, api.ignore))
    .then(() => db.checkToken(params.userID, params.token, res))
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
  // const bool = !!req.body.bool;
  // const itemID = api.sqlNumberArray(req.body.itemID);
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID, unitID, pageID } = api.sqlNumber(
  //   req.body,
  //   ['userID', 'unitID', 'pageID'],
  //   res
  // );
  // if (!(userID && token)) return;
  // if (!(itemID instanceof Array)) {
  //   api.invalidArgument(res);
  //   return;
  // }
  const { userID, token } = req.cookies;
  const { unitID, pageID, itemID, bool } = req.body;

  db.checkToken(userID, token, res)
    .then(() => db.deleteItem(userID, unitID, pageID, itemID, bool))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

router.post('/track', (req, res) => {
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID, unitID, pageID, trackID } = api.sqlNumber(
  //   req.body, ['userID', 'unitID', 'pageID', 'trackID'], res
  // );
  // if (!(userID && token)) return;
  const { userID, token } = req.cookies;
  const { unitID, pageID, trackID } = req.body;

  db.checkToken(userID, token, res)
    .then(() => db.deleteTrack(userID, unitID, pageID, trackID))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

module.exports = router;
