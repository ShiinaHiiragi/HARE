var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var db = require('../bin/db');
var api = require('../bin/api');

// setting of user information
router.post('/profile', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => api.param(req.body, params, ['userName', 'birth', 'gender', 'tel', 'city'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.editProfile(params.userID, params.userName,
      params.birth, params.gender, params.tel, params.city))
    .then(() => api.noContent(res));
});

router.post('/avatar', (req, res) => {
  const params = new Object();
  let typeReg = /^data:image\/(\w+);base64,/, basicPath;
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => api.param(req.body, params, ['avatar', 'type'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => {
      basicPath = path.join(__dirname, '../src/avatar');
      return new Promise((resolve, reject) => {
        fs.readdir(basicPath, (err, dir) => {
          if (err) { reject(); return; }
          // delete the previous image first
          const userReg = new RegExp(`${params.userID}\\.(.+)`);
          const prevAvatar = dir.find((fileItem) => userReg.test(fileItem));
          if (prevAvatar) fs.unlinkSync(path.join(basicPath, prevAvatar));
          resolve();
        });
      })
    })
    // save the file uploaded
    .then(() => db.editAvatarExtent(params.userID, params.type))
    .then(() => {
      let avatarBase = params.avatar.replace(typeReg, '');
      let avatarBuffer = new Buffer(avatarBase, 'base64');
      return new Promise((resolve, reject) => {
        fs.writeFile(
          path.join(basicPath, `${params.userID}${params.type === '.jpeg' ? '.jpg' : params.type}`),
          avatarBuffer,
          (err) => { if (!err) resolve(); else reject(); }
        );
      });
    })
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

// setting of unit, page and item
router.post('/unit', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => api.param(req.body, params, ['unitID', 'unitName'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.editUnit(params.userID, params.unitID, params.unitName))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

router.post('/page', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID', 'pageName', 'pagePresent'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.editPage(params.userID, params.unitID,
      params.pageID, params.pageName, params.pagePresent))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));;
});

router.post('/item', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID', 'itemID'], res))
    .then(() => api.param(req.body, params, ['query', 'key'], res, api.ignore))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => {
      const field = params.query === undefined ? 'key' : 'query';
      const value = params[field];
      // if both query and key are undefined
      if (value !== undefined)
        return db.editItem(params.userID, params.unitID,
          params.pageID, params.itemID[0], field, value);
    })
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

router.post('/recall', (req, res) => {
  // const bool = !!req.body.bool
  // const pure = api.sqlNumberArray(req.body.pure);
  // const far = api.sqlNumberArray(req.body.far);
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID, unitID, pageID } = api.sqlNumber(
  //   req.body, ['userID', 'unitID', 'pageID'], res
  // );
  // if (!(userID && token)) return;
  // if (!(pure instanceof Array) || !(far instanceof Array)) {
  //   api.invalidArgument(res);
  //   return;
  // }
  const { userID, token } = req.cookies;
  const { unitID, pageID, bool, pure, far } = req.body;

  db.checkToken(userID, token, res)
    .then(() => db.updateThis(userID, unitID, pageID, pure, far, bool))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

// move is for item and swap is for unit and page
router.post('/move', (req, res) => {
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID, unitID, pageID, src, dst } = api.sqlNumber(
  //   req.body,
  //   ['userID', 'unitID', 'pageID', 'src', 'dst'],
  //   res
  // );
  // if (!(userID && token)) return;
  const { userID, token } = req.cookies;
  const { unitID, pageID, src, dst } = req.body;

  db.checkToken(userID, token, res)
    .then(() => db.moveItem(userID, unitID, pageID, src, dst))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

router.post('/swap', (req, res) => {
  // const bool = !!req.body.bool;
  // const less = api.sqlNumberArray(req.body.less);
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID } = api.sqlNumber(req.body, ['userID'], res);
  // if (!(userID && token)) return;
  // if ((bool && typeof less !== 'number') ||
  //   (!bool && (!(less instanceof Array) || less.length !== 2))) {
  //   api.invalidArgument(res);
  //   return;
  // }
  const { userID, token } = req.cookies;
  const { bool, less } = req.body;

  db.checkToken(userID, token, res)
    .then(() => {
      if (bool) return  db.moveUnit(userID, less)
      else return db.movePage(userID, less[0], less[1])
    })
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));;
});

// the icon for editing
router.post('/cover', (req, res) => {
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID, unitID, pageID, dst } = api.sqlNumber(
  //   req.body,
  //   ['userID', 'unitID', 'pageID', 'dst'],
  //   res
  // );
  // if (!(userID && token)) return;
  const { userID, token } = req.cookies;
  const { unitID, pageID, dst } = req.body;

  db.checkToken(userID, token, res)
    .then(() => db.editCover(userID, unitID, pageID, dst))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

router.post('/track', (req, res) => {
  // const { token } = api.sqlString(req.cookies, ['token'], res);
  // const { userID, unitID, pageID, itemID, trackID } = api.sqlNumber(
  //   req.body, ['userID', 'unitID', 'pageID', 'itemID', 'trackID'], res
  // );
  // const track = (req.body.track === 'P' || req.body.track === 'F')
  //   ? req.body.track : 'L';
  // if (!(userID && token)) return;

  const { userID, token } = req.cookies;
  const { unitID, pageID, itemID, trackID } = req.body;
  const track = (req.body.track === 'P' || req.body.track === 'F')
    ? req.body.track : 'L';

  db.checkToken(userID, token, res)
    .then(() => db.editTrack(userID, unitID, pageID, itemID[0], trackID, track))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

module.exports = router;
