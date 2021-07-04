var express = require('express');
var router = express.Router();
var query = require('../bin/db').query;
var newToken = require('../bin/db').newToken;
var SHA1 = require('crypto-js').SHA1;

router.get('/sign', (req, res) => {
  query(`select userID from userInfo natural join userSetting
    where email = '${req.query.email}' and password = '${req.query.password}'`)
    .then(out => {
      console.log(out);
      const token = SHA1(req.query.email + new Date().toString()).toString();
      if (out.length > 0) {
        newToken(out[0].userid, token).then(() =>
          res.send(JSON.stringify({uid: out[0].userid, token: token})));
      } else res.status(403).send("Incorrect E-mail or password.");
    }).catch((err) => res.status(500).send(err.toString()));
});

module.exports = router;
