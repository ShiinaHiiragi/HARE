var express = require('express');
var router = express.Router();
var checkToken = require('../bin/db').checkToken;

router.post('/new-up', (req, res) => {
  checkToken(req.body.userID, req.body.token, res)
    .then(() => {
      res.send('ok');
    });
});

module.exports = router;
