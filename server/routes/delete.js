var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var api = require('../bin/api');

router.post('/up', (req, res) => {
  const group = !!req.body.group;
  const { token } = api.sqlString(req.cookies, ['token'], res);
  const { userID, unitID, pageID } = api.sqlNumber(
    req.body,
    ['userID', 'unitID', 'pageID'],
    res
  );
  if (!(userID && token)) return;

  db.checkToken(userID, token, res)
    .then(() => {
      if (group) {
        db.deleteUnit(userID, unitID)
          .then(() => res.send('unit'))
          .catch(() => api.internalServerError(res));
      } else {
        db.deletePage(userID, unitID, pageID)
          .then((out) => {
            if (!out[0].pagesize) {
              db.deleteUnit(userID, unitID)
                .then(() => res.send('unit'))
                .catch(() => api.internalServerError(res));
            } else res.send('page');
          })
          .catch(() => api.internalServerError(res));
      }
    });
});

router.post('/item', (req, res) => {
  const bool = !!req.body.bool;
  const itemID = api.sqlNumberArray(req.body.itemID);
  const { token } = api.sqlString(req.cookies, ['token'], res);
  const { userID, unitID, pageID } = api.sqlNumber(
    req.body,
    ['userID', 'unitID', 'pageID'],
    res
  );
  if (!(userID && token)) return;
  if (!(itemID instanceof Array)) {
    api.invalidArgument(res);
    return;
  }

  db.checkToken(userID, token, res)
    .then(() => db.deleteItem(userID, unitID, pageID, itemID, bool))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

router.post('/track', (req, res) => {
  const { token } = api.sqlString(req.cookies, ['token'], res);
  const { userID, unitID, pageID, trackID } = api.sqlNumber(
    req.body, ['userID', 'unitID', 'pageID', 'trackID'], res
  );
  if (!(userID && token)) return;

  db.checkToken(userID, token, res)
    .then(() => db.deleteTrack(userID, unitID, pageID, trackID))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

module.exports = router;
