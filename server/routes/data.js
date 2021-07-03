var express = require('express');
var router = express.Router();
var query = require('../bin/db').query;

router.get('/test', function (req, res, next) {
  query(`
    select uid, name
    from hare
    where name = 'Alice'`)
    .then((out) => res.send(out));
});

module.exports = router;
