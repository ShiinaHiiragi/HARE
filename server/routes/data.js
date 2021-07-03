var express = require('express');
var router = express.Router();
var query = require('../bin/db').query;

router.get('/sign', (req, res) => {
  console.log(req.query);
  res.send(JSON.stringify({
    uid: "1",
    token: "23"
  }));
});

module.exports = router;
