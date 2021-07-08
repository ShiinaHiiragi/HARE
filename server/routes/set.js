var express = require('express');
var router = express.Router();
var db = require('../bin/db');

router.post('/new-up', (req, res) => {
  db.checkToken(req.body.userID, req.body.token, res)
    .then(() => {
      const { userID, group, type, unitName, pageName, pagePresent } = req.body;
      if (group) {
        // the feature of OR in js
        db.newUnit(userID, type || 1, unitName)
          .then(() => db.newPage(userID, type || 1, 1, pageName, pagePresent))
          .then(() => db.getUnitPage(userID))
          .then(out => res.send(out))
          .catch((err) => res.status(500).send(err));
      } else {
        db.newPage(userID, type[0], type[1], pageName, pagePresent)
          .then(() => db.getUnitPage(userID))
          .then(out => res.send(out))
          .catch((err) => res.status(500).send(err));
      }
    });
});

module.exports = router;
