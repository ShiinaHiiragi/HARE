var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var api = require('../bin/api');

router.post('/new-up', (req, res) => {
  // TODO: check the validity of group and type in new-up & swap & delete
  const { group, type } = req.body;
  const { userID } = api.sqlNumber(req.body, ["userID"]);
  const { token, unitName, pageName, pagePresent } = api.sqlString(
    req.body,
    ["token", "unitName", "pageName", "pagePresent"]
  );
  db.checkToken(userID, token, res)
    .then(() => {
      if (group) {
        // the feature of OR in js
        db.newUnit(userID, type || 1, unitName)
          .then(() => db.newPage(userID, type || 1, 1, pageName, pagePresent))
          .then(() => res.send(""))
          .catch(() => api.internalServerError(res));
      } else {
        db.newPage(userID, type[0], type[1], pageName, pagePresent)
          .then(() => res.send(""))
          .catch(() => api.internalServerError(res));
      }
    });
});

router.post('/swap', (req, res) => {
  const { group, less } = req.body;
  const { userID } = api.sqlNumber(req.body, ["userID"]);
  const { token } = api.sqlString(req.body, ["token"]);
  db.checkToken(userID, token, res)
    .then(() => {
      if (group) {
        db.moveUnit(userID, less)
          .then(() => res.send(""))
          .catch(() => api.internalServerError(res));
      } else {
        db.movePage(userID, less[0], less[1])
          .then(() => res.send(""))
          .catch(() => api.internalServerError(res));
      }
    });
});

router.post('/unit', (req, res) => {
  const { userID, unitID } = api.sqlNumber(req.body, ["userID", "unitID"]);
  const { token, name } = api.sqlString(req.body, ["token", "name"]);
  db.checkToken(userID, token, res)
    .then(() => {
      db.editUnit(userID, unitID, name)
        .then(() => res.send(""))
        .catch(() => api.internalServerError(res));
    });
});

router.post('/delete-up', (req, res) => {
  const { group } = req.body;
  const { userID, unitID, pageID } = api.sqlNumber(
    req.body,
    ["userID", "unitID", "pageID"]
  );
  const { token } = api.sqlString(req.body, ["token"]);
  db.checkToken(userID, token, res)
    .then(() => {
      if (group) {
        db.deleteUnit(userID, unitID)
          .then(() => res.send("unit"))
          .catch(() => api.internalServerError(res));
      } else {
        db.deletePage(userID, unitID, pageID)
          .then((out) => {
            if (!out[0].pagesize) {
              db.deleteUnit(userID, unitID)
                .then(() => res.send("unit"))
                .catch(() => api.internalServerError(res));
            } else res.send("page");
          })
          .catch(() => api.internalServerError(res));
      }
    });
});

module.exports = router;
