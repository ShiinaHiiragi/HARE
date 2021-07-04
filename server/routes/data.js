var express = require('express');
var router = express.Router();
var query = require('../bin/db').query;

router.get('/sign', (req, res) => {
  query(`select userID from userInfo natural join userSetting
    where email = '${req.query.email}' and password = '${req.query.password}'`)
    .then(out => {
      console.log(out);
      if (out.length > 0) res.send(JSON.stringify({
        uid: out[0].userid, token: "23"
      })); else res.status(403).send("Incorrect E-mail or password.");
    }).catch((err) => res.status(500).send(err.toString()));
});

module.exports = router;
