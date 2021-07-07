var express = require('express');
var router = express.Router();
var checkToken = require('../bin/db').checkToken;
var newUnit = require('../bin/db').newUnit;
var newPage = require('../bin/db').newPage;

router.post('/new-up', (req, res) => {
  checkToken(req.body.userID, req.body.token, res)
    .then(() => {
      const { userID, group, type, unitName, pageName, pagePresent } = req.body;
      if (group) {
        newUnit(userID, 1, unitName)
          .then(() => newPage(userID, 1, 1, pageName, pagePresent))
          .then(() => res.send("OK"))
          .catch((err) => res.status(500).send(err));
      } else {
        res.send(req.body);
      }
    });
});

module.exports = router;
