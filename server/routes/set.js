var express = require('express');
var router = express.Router();
var db = require('../bin/db');

router.post('/new-up', (req, res) => {
  db.checkToken(req.body.userID, req.body.token, res)
    .then(() => {
      const { userID, group, type, unitName, pageName, pagePresent } = req.body;
      if (group) {
        db.newUnit(userID, type || 1, unitName)
          .then(() => db.newPage(userID, type || 1, 1, pageName, pagePresent))
          .then(() => db.getUnitPage(userID))
          .then(out => res.send(out))
          .catch((err) => res.status(500).send(err));
      } else {
        res.send(req.body);
      }
    });
});

module.exports = router;
