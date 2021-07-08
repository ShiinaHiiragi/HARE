var express = require('express');
var router = express.Router();
var db = require('../bin/db');
var api = require('../bin/api');

router.post('/new-up', (req, res) => {
  // TODO: check the validity of group and type in new-up & swap
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
          .catch((err) => res.status(500).send(err));
      } else {
        db.newPage(userID, type[0], type[1], pageName, pagePresent)
          .then(() => res.send(""))
          .catch((err) => res.status(500).send(err));
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
          .catch((err) => res.status(500).send(err));
      } else {
        res.send(req.body);
      }
    });
});

module.exports = router;
