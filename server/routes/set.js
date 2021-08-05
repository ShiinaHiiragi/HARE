var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var db = require('../bin/db');
var api = require('../bin/api');

// setting of user information
router.post('/profile', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['userName', 'birth', 'gender', 'tel', 'city'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.editProfile(params.userID, params.userName,
      params.birth, params.gender, params.tel, params.city))
    .then(() => api.noContent(res));
});

router.post('/avatar', (req, res) => {
  const params = new Object();
  let typeReg = /^data:image\/(\w+);base64,/, basicPath;
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['avatar', 'type'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
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
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'unitName'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.editUnit(params.userID, params.unitID, params.unitName))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

router.post('/page', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID', 'pageName', 'pagePresent'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.editPage(params.userID, params.unitID,
      params.pageID, params.pageName, params.pagePresent))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));;
});

router.post('/item', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID', 'itemID'], res))
    .then(() => api.param(req.body, params, ['query', 'key'], res, api.ignore))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
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
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID', 'pure', 'far'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.editThis(params.userID, params.unitID,
      params.pageID, params.pure, params.far))
    .then(() => api.noContent(res))
    .catch((err) => api.catchError(err, res));
});

// move is for item and swap is for unit and page
router.post('/move', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID', 'src', 'dst'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.checkRange(params.userID, {
      unit: params.unitID,
      page: params.pageID,
      item: params.dst
    }, 0, res))
    .then(() => db.checkRange(params.userID, {
      unit: params.unitID,
      page: params.pageID,
      item: params.src
    }, 0, res))
    .then(() => db.moveItem(params.userID, params.unitID, params.pageID, params.src, params.dst))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

router.post('/swap', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['src'], res))
    .then(() => api.param(req.body, params, ['unitID'], res, api.ignore))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.checkRange(params.userID, {
      unit: params.unitID ?? params.src,
      page: params.unitID && params.src,
    }, -1, res))
    .then(() => {
      if (params.unitID === undefined) return db.moveUnit(params.userID, params.src)
      else return db.movePage(params.userID, params.unitID, params.src)
    })
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

// the icon for editing
router.post('/cover', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID', 'dst'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.editCover(params.userID, params.unitID, params.pageID, params.dst))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

router.post('/track', (req, res) => {
  const params = new Object();
  api.param(req.cookies, params, ['userID', 'token', 'session'], res)
    .then(() => api.param(req.body, params, ['unitID', 'pageID', 'itemID', 'trackID', 'track'], res))
    .then(() => db.checkToken(params.userID, params.token, res))
    .then(() => db.checkSession(params.userID, params.session, res))
    .then(() => db.editTrack(params.userID, params.unitID,
      params.pageID, params.itemID[0], params.trackID, params.track))
    .then(() => api.noContent(res))
    .catch(() => api.internalServerError(res));
});

module.exports = router;
