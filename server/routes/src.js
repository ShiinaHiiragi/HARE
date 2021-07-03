var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

// get a number randomly in [sub, sup];
const dice = (sub, sup) => {
  return Math.round(Math.random() * (sup - sub) + sub)
}

router.get('/cover', (req, res) => {
  fs.readdir(path.join(__dirname, '../src/cover'), (err, dir) => {
    if (err) res.status(500).send(err);
    else {
      const sup = dir.length - 1;
      const retImage = dir[dice(0, sup)]
      res.sendFile(path.join(__dirname, `../src/cover/${retImage}`));
    }
  });
});

module.exports = router;
