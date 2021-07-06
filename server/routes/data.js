var express = require('express');
var SHA1 = require('crypto-js').SHA1;
var query = require('../bin/db').query;
var newToken = require('../bin/db').newToken;
var updateToken = require('../bin/db').updateToken;
var checkToken = require('../bin/db').checkToken;
var router = express.Router();

router.get('/check', (req, res) => {
  const userID = req.query.userID === "undefined" ? "0" : req.query.userID;
  checkToken(userID, req.query.token, res)
    .then(() => updateToken(userID).then(() => res.send("HARE")));
});

router.post('/sign', (req, res) => {
  query(`select userID from userInfo natural join userSetting
    where email = '${req.body.email}' and password = '${req.body.password}'`)
    .then(out => {
      const token = SHA1(req.body.email + new Date().toString()).toString();
      if (out.length > 0) {
        newToken(out[0].userid, token).then(() =>
          res.send({ uid: out[0].userid, token: token }));
      } else res.status(401).send("Incorrect E-mail or password.");
    }).catch((err) => res.status(500).send(err.toString()));
});

router.post('/logout', (req, res) => {
  checkToken(req.body.userID, req.body.token)
    .then(() => query(`delete from onlineUser where userID = ${req.body.userID}`));
});

router.get('/unit', (req, res) => {
  const {userID, token} = req.query;
  checkToken(userID, token, res).then(() => {
    res.send([]);
    // res.send([
    //   {
    //     unitID: 1,
    //     unitName: "Operating System",
    //     open: true,
    //     pages: [
    //       {
    //         pageID: 1,
    //         pageName: "Process",
    //         PageCover: 0,
    //         PageDescribe: "",
    //       },
    //       {
    //         pageID: 2,
    //         pageName: "TLB",
    //         PageCover: 0,
    //         PageDescribe: "",
    //       },
    //       {
    //         pageID: 3,
    //         pageName: "Dispatching",
    //         PageCover: 0,
    //         PageDescribe: "",
    //       }
    //     ]
    //   },
    //   {
    //     unitID: 2,
    //     unitName: "Mathmatics",
    //     open: false,
    //     pages: [
    //       {
    //         pageID: 1,
    //         pageName: "Predicate",
    //         PageCover: 0,
    //         PageDescribe: "",
    //       }
    //     ]
    //   },
    //   {
    //     unitID: 3,
    //     unitName: "Networks",
    //     open: false,
    //     pages: [
    //       {
    //         pageID: 1,
    //         pageName: "DNS",
    //         PageCover: 0,
    //         PageDescribe: "",
    //       },
    //       {
    //         pageID: 2,
    //         pageName: "TCP/IP",
    //         PageCover: 0,
    //         PageDescribe: "",
    //       }
    //     ]
    //   }
    // ]);
  });
});

module.exports = router;
