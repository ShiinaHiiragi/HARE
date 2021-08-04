const Pool = require('pg').Pool
const fs = require('fs');
const path = require('path');
const api = require('./api');

const tokenLifeSpan = 24 * 3600 * 1000;
const setting = JSON.parse(fs.readFileSync(path.join(__dirname, './setting.json')))
const pool = new Pool(setting.poolSetting);

// db inner api
const query = (sql) => new Promise((resolve, reject) => {
  pool.query(sql, (err, res) => {
    if (err) reject(err);
    else resolve(res.rows);
  });
});
exports.query = query;

// db api for server init and command
exports.dbInitialize = (clearAll) => new Promise((resolve, reject) => {
  const newTable = () => {
    const schemaSQL = Object.values(setting.schema).map(item => item.join(' '));
    api.syncEachChain(schemaSQL, (item, onsuccess, onerror) => {
      query(item).then(onsuccess).catch(onerror);
    }).then(resolve).catch(reject);
  }
  if (clearAll) {
    const schemas = Object.keys(setting.schema).reverse();
    api.syncEachChain(schemas, (item, onsuccess, onerror) => {
      query(`drop table if exists ${item}`)
        .then(onsuccess).catch(onerror);
    }).then(newTable);
  } else newTable();
});

exports.exec = (cmdLine) => new Promise((resolve, reject) => {
  if (cmdLine[0] === '') cmdLine.shift();
  if (cmdLine[cmdLine.length - 1] === '') cmdLine.pop();
  if (cmdLine[0] === 'sign') {
    api.checkRegister(cmdLine)
      .then((newLine) => insertUser(newLine, resolve, reject))
      .catch(reject);
  } else if (cmdLine[0] === 'view') {
    viewTable(cmdLine, resolve, reject);
  } else if (cmdLine[0] === 'sql') {
    cmdLine.shift();
    query(cmdLine.join(' '))
      .then((out) => { console.log(out); resolve(); })
      .catch(reject);
  } else if (cmdLine[0] === 'eval') {
    cmdLine.shift();
    try {
      eval(cmdLine.join(' '));
      resolve();
    } catch (err) { reject(err); }
  } else reject('ERROR: cannot parse the command.');
});

const insertUser = (cmdLine, onsuccess, onerror) => {
  let returnUserID;
  query(`insert into userInfo(email)
    values('${cmdLine[1]}')
    returning userID`)
    .then((res) => {
      returnUserID = res[0].userid;
      return query(`insert into userSetting(userID, username, password)
        values(${returnUserID}, '${cmdLine[2]}', '${cmdLine[3]}')`)
    }).then(() => {
      console.log(`INSERT userID: ${returnUserID}`);
      onsuccess();
    }).catch(onerror);
}

const viewTable = (cmdLine, onsuccess, onerror) => {
  if (Object.keys(setting.schema).find((item) => item === cmdLine[1]))
    query(`select * from ${cmdLine[1]}`).then((out) => {
      console.log(out);
      onsuccess(out);
    }).catch(onerror)
  else onerror('ERROR: Nonexistent schema.');
}

// db api for profile and avatar extent request
exports.getProfile = (userID) => new Promise((resolve, reject) => 
  query(`select userName, userID, email, gender, birth, city, tel
    from userSetting natural join userInfo where userID = ${userID}`)
    .then(resolve).catch(reject)
);

exports.editProfile = (userID, userName, birth, gender, tel, city) =>
  new Promise((resolve, reject) => 
    query(`update userSetting set userName = '${userName}',
      birth = '${api.format(new Date(birth), 'yyyy-MM-dd')}',
      gender = '${gender}', tel = '${tel}', city = '${city}'
      where userID = '${userID}'`)
      .then(resolve).catch(reject)
  );

exports.getAvatarExtent = (userID) => new Promise((resolve, reject) => 
  query(`select avatar from userSetting where userID = ${userID}`)
  .then(resolve).catch(reject)
);

exports.editAvatarExtent = (userID, type) => new Promise((resolve, reject) => 
  query(`update userSetting set avatar = '${type === '.jpeg' ? '.jpg' : type}'
    where userID = ${userID}`).then(resolve).catch(reject)
);

// db api for token
exports.checkToken = (userID, token, res) => new Promise((resolve, reject) => 
  query(`select * from onlineUser
    where userID = ${userID} and token = '${token}'`)
    .then((out) => {
      if (out.length === 0)
        api.notAuthorized(res, 'INVALID');
      else if (new Date() - new Date(out[0].lasttime) > tokenLifeSpan)
        api.notAuthorized(res, 'EXPIRED');
      else newToken(userID).then(resolve);
    })
    .catch(reject)
)

const newToken = (userID, token) => new Promise((resolve, reject) => {
  if (token)
    query(`insert into onlineUser(userID, token, lastTime)
      values(${userID}, '${token}', now())
      on conflict (userID) do update
      set token = EXCLUDED.token, lastTime = EXCLUDED.lastTime`)
      .then(resolve).catch(reject);
  else
    query(`insert into onlineUser(userID, token, lastTime)
      values(${userID}, '', now())
      on conflict (userID) do update
      set lastTime = EXCLUDED.lastTime`)
      .then(resolve).catch(reject);
})
exports.newToken = newToken;
exports.updateToken = (userID) => newToken(userID);

// db api for client menu get or post
exports.getUnitPage = (userID) => new Promise((resolve, reject) => {
  query(`select unitID, unitName from unit
    where userID = ${userID} order by unitID asc`)
    .then((out) => {
      return out.map((item) => ({
        unitID: item.unitid,
        unitName: item.unitname,
        open: item.unitid === 1 ? true : false,
        selected: false,
        pages: []
    }))}
    ).then((listItem) => {
      api.syncEachChain(listItem, (item, onsuccess, onerror) => {
        query(`select pageID, pageName, pageCover, pagePresent from page
          where userID = ${userID} and unitID = ${item.unitID} order by pageID asc`)
          .then((out) => {
            item.pages = out.map((subItem) => ({
              selected: false,
              route: 1,
              pageID: subItem.pageid,
              pageName: subItem.pagename,
              pageCover: subItem.pagecover,
              pagePresent: subItem.pagepresent
            }))
            onsuccess();
          }).catch(onerror);
      }).then(() => resolve(listItem)).catch(reject);
    }).catch(reject);
});

exports.newUnit = (userID, unitID, unitName) => new Promise((resolve, reject) => {
  query(`begin;
    update unit set unitID = -unitID - 1 where userID = ${userID} and unitID >= ${unitID};
    update unit set unitID = -unitID where userID = ${userID} and unitID < 0;
    update userSetting set unitSize = unitSize + 1 where userID = ${userID};
    insert into unit(userID, unitID, unitName, unitCreateTime)
    values(${userID}, ${unitID}, '${unitName}', now()); commit;`)
    .then(resolve).catch(reject);
});

exports.newPage = (userID, unitID, pageID, pageName, pagePresent) => 
  new Promise((resolve, reject) => {
    query(`begin; update page set pageID = -pageID - 1
      where userID = ${userID} and unitID = ${unitID} and pageID >= ${pageID};
      update page set pageID = -pageID
      where userID = ${userID} and unitID = ${unitID} and pageID < 0;
      update unit set pageSize = pageSize + 1
      where userID = ${userID} and unitID = ${unitID};
      insert into page(userID, unitID, pageID, pageName, pagePresent, pageCreateTime)
      values(${userID}, ${unitID}, ${pageID}, '${pageName}', '${pagePresent}', now());
      commit;`).then(resolve).catch(reject);
});

exports.moveUnit = (userID, less) => new Promise((resolve, reject) => {
  query(`begin; update unit set unitID = ${-less - 1}
    where userID = ${userID} and unitID = ${less};
    update unit set unitID = ${-less}
    where userID = ${userID} and unitID = ${less + 1};
    update unit set unitID = -unitID
    where userID = ${userID} and (unitID = ${-less} or unitID = ${-less - 1});
    commit;`).then(resolve).catch(reject);
});

exports.movePage = (userID, unitID, less) => new Promise((resolve, reject) => {
  query(`begin; update page set pageID = ${-less - 1}
    where userID = ${userID} and unitID = ${unitID} and pageID = ${less};
    update page set pageID = ${-less}
    where userID = ${userID} and unitID = ${unitID} and pageID = ${less + 1};
    update page set pageID = -pageID
    where userID = ${userID} and unitID = ${unitID} and (
    pageID = ${-less} or pageID = ${-less - 1}); commit;`)
    .then(resolve).catch(reject);
});

exports.deleteUnit = (userID, unitID) => new Promise((resolve, reject) => {
  query(`begin; delete from unit where userID = ${userID} and unitID = ${unitID};
    update userSetting set unitSize = unitSize - 1 where userID = ${userID};
    update unit set unitID = 1 - unitID
    where userID = ${userID} and unitID > ${unitID};
    update unit set unitID = -unitID
    where userID = ${userID} and unitID < 0; commit;`)
    .then(resolve).catch(reject);
});

exports.deletePage = (userID, unitID, pageID) => new Promise((resolve, reject) => {
  query(`begin; delete from page
    where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID};
    update unit set pageSize = pageSize - 1
    where userID = ${userID} and unitID = ${unitID};
    update page set pageID = 1 - pageID
    where userID = ${userID} and unitID = ${unitID} and pageID > ${pageID};
    update page set pageID = -pageID
    where userID = ${userID} and unitID = ${unitID} and pageID < 0;
    commit;`)
    .then(() => query(`select pageSize from unit
      where userID = ${userID} and unitID = ${unitID}`))
    .then(resolve).catch(reject);
});

exports.editUnit = (userID, unitID, unitName) => new Promise((resolve, reject) => {
  query(`update unit set unitName = '${unitName}'
    where userID = ${userID} and unitID = ${unitID}`)
    .then(resolve).catch(reject);
});

// db api for cover page detail
exports.getPageDetail = (userID, unitID, pageID) => new Promise((resolve, reject) => {
  query(`select itemSize, trackSize, pageCreateTime, timeThis from page
    where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID}`)
    .then(resolve).catch(reject);
});

exports.editPage = (userID, unitID, pageID, pageName, pagePresent) =>
  new Promise((resolve, reject) => {
    query(`update page set pageName = '${pageName}', pagePresent = '${pagePresent}'
      where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID}`)
      .then(resolve).catch(reject);
  });

exports.editCover = (userID, unitID, pageID, cover) => new Promise((resolve, reject) => {
  query(`update page set pageCover = ${cover} where userID = ${userID}
    and unitID = ${unitID} and pageID = ${pageID}`)
    .then(resolve).catch(reject);
});

// db api for page view request
exports.newItem = (userID, unitID, pageID, itemID, itemQuery, itemKey) =>
  new Promise((resolve, reject) => {
    query(`begin; update item set itemID = -itemID - 1
      where userID = ${userID} and unitID = ${unitID}
      and pageID = ${pageID} and itemID >= ${itemID};
      update item set itemID = -itemID
      where userID = ${userID} and unitID = ${unitID}
      and pageID = ${pageID} and itemID < 0;
      update page set itemSize = itemSize + 1
      where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID};
      insert into item(userID, unitID, pageID, itemID,
        itemQuery, itemKey, itemCreateTime)
      values(${userID}, ${unitID}, ${pageID}, ${itemID},
        '${itemQuery}', '${itemKey}', now()); commit;`)
    .then(() => query(`select trackSize from page where userID = ${userID}
    and unitID = ${unitID} and pageID = ${pageID};`))
    .then((out) => {
      const trackSize = out[0].tracksize;
      if (trackSize)
        return query(`update item set itemRecord = array${api.arrayLostString(trackSize)}
          where userID = ${userID} and unitID = ${unitID}
          and pageID = ${pageID} and itemID = ${itemID}`);
    })
    .then(() => query(`select itemCreateTime from item where userID = ${userID}
    and unitID = ${unitID} and pageID = ${pageID} and itemID = ${itemID};`))
    .then((out) => resolve(out[0].itemcreatetime.toISOString()))
    .catch(reject);
  });

exports.getItem = (userID, unitID, pageID) => new Promise((resolve, reject) => {
  query(`select itemID, itemQuery, itemKey, itemCreateTime, itemRecord
    from item where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID}
    order by itemID asc`).then(resolve).catch(reject);
});

exports.deleteItem = (userID, unitID, pageID, itemID, track) =>
  new Promise((outerSuccess, outerError) => {
    const deleteSize = itemID.length;
    const tuple = api.arrayTupleString(itemID);
    Promise.all([
      new Promise((resolve) => {
        query(`select itemSize from page where userID = ${userID}
          and unitID = ${unitID} and pageID = ${pageID}`)
          .then((out) => {
            let remain = new Array(out[0].itemsize).fill().map((_, index) => index + 1);
            remain = itemID.reduce((current, item, index) => {
              current.splice(item - index - 1, 1);
              return current;
            }, remain)
            resolve(remain);
          });
      }),
      query(`begin; delete from item where userID = ${userID} and unitID = ${unitID}
        and pageID = ${pageID} and itemID in ${tuple};
        update page set itemSize = itemSize - ${deleteSize} where userID = ${userID}
        and unitID = ${unitID} and pageID = ${pageID}; commit;`),
    ]).then((arg) => {
      const remain = arg[0];
      api.syncEachChain(remain, (arrayItem, onsuccess, onerror, arrayIndex) => {
        query(`update item set itemID = ${arrayIndex + 1} where userID = ${userID}
          and unitID = ${unitID} and pageID = ${pageID} and itemID = ${arrayItem}`)
          .then(onsuccess).catch(onerror)
      }).then(() => {
        if (track) query(`begin; delete from track where userID = ${userID}
          and unitID = ${unitID} and pageID = ${pageID};
          update page set trackSize = 0 where userID = ${userID}
          and unitID = ${unitID} and pageID = ${pageID}; commit`)
          .then(outerSuccess).catch(outerError);
        else outerSuccess();
      }).catch(outerError);
    }).catch(outerError);
  });

exports.moveItem = (userID, unitID, pageID, src, dst) =>
  new Promise((resolve, reject) => {
    const direction = src < dst ? -1 : 1;
    const left = direction < 0 ? src + 1 : dst;
    const right = direction < 0 ? dst : src - 1;
    query(`begin; update item set itemID = 0
      where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID} and itemID = ${src};
      update item set itemID = -(itemID + (${direction}))
      where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID}
      and itemID >= ${left} and itemID <= ${right};
      update item set itemID = -itemID
      where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID} and itemID < 0;
      update item set itemID = ${dst}
      where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID} and itemID = 0;
      commit;`).then(resolve).catch(reject);
  });

// about recall
exports.getThis = (userID, unitID, pageID, clear) => new Promise((resolve, reject) => {
  let timeThis, trackSize;

  query(`select timeThis, trackSize from page
    where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID}`)
    .then((out) => {
      timeThis = out[0].timethis;
      trackSize = out[0].tracksize;
    })
    .then(() => {
      const queryString = (timeThis && clear)
        ? `update item set itemRecord[${trackSize}] = 'L' where
          userID = ${userID} and unitID = ${unitID} and pageID = ${pageID}`
        : (timeThis && !clear)
        ? `select itemID from item where userID = ${userID}
          and unitID = ${unitID} and pageID = ${pageID}
          and itemRecord[${trackSize}] = 'L' order by itemID asc`
        : `begin; update item set itemRecord = array_append(itemRecord, 'L') where
          userID = ${userID} and unitID = ${unitID} and pageID = ${pageID};
          update page set trackSize = trackSize + 1 where userID = ${userID}
          and unitID = ${unitID} and pageID = ${pageID};
          insert into track(userID, unitID, pageID, trackID)
          values(${userID}, ${unitID}, ${pageID}, ${trackSize + 1}); commit;`;
        return query(queryString);
    })
    .then((out) => {
      if (timeThis && !clear) {
        resolve({
          lost: out.map((item) => item.itemid),
          time: new Date() - new Date(timeThis)
        });
      } else {
        let resolveTime;
        query(`update page set timeThis = now() where userID = ${userID}
          and unitID = ${unitID} and pageID = ${pageID} returning timeThis;`)
          .then((out) => {
            resolveTime = new Date(out[0].timethis);
            return query(`update track set startTime = (select timeThis from page
              where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID})
              where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID}
              and trackID = ${timeThis ? trackSize : trackSize + 1}`);
          })
          .then(() => resolve({ time: new Date() - resolveTime }))
      }
    })
    .catch(reject);
});

exports.updateThis = (userID, unitID, pageID, pure, far, lost) => {
  const pureTuple = api.arrayTupleString(pure);
  const farTuple = api.arrayTupleString(far);
  let outerTrackSize;

  return new Promise((resolve, reject) => {
    query(`select trackSize from page where userID = ${userID}
      and unitID = ${unitID} and pageID = ${pageID}`)
      .then((out) => {
        let promiseArray = [], trackSize = out[0].tracksize;
        outerTrackSize = trackSize;
        if (pure.length) promiseArray.push(
          query(`update item set itemRecord[${trackSize}] = 'P' where userID = ${userID}
            and unitID = ${unitID} and pageID = ${pageID} and itemID in ${pureTuple}`)
        );
        if (far.length) promiseArray.push(
          query(`update item set itemRecord[${trackSize}] = 'F' where userID = ${userID}
            and unitID = ${unitID} and pageID = ${pageID} and itemID in ${farTuple}`)
        );
        return Promise.all(promiseArray)
      })
      .then(() => {
        if (lost) return;
        else return Promise.all([
          query(`update page set timeThis = null where
          userID = ${userID} and unitID = ${unitID} and pageID = ${pageID}`),
          query(`update track set endTime = now() where userID = ${userID}
          and unitID = ${unitID} and pageID = ${pageID} and trackID = ${outerTrackSize}
          returning endTime`)
        ]);
      })
      .then(resolve).catch(reject);
  });
}

exports.getStat = (userID, unitID, pageID) => new Promise((resolve, reject) => {
  query(`select trackID, startTime, endTime from track where
    userID = ${userID} and unitID = ${unitID} and pageID = ${pageID}`)
    .then((out) => Promise.all(out.map((item) => new Promise((resolve, reject) => {
      Promise.all([
        query(`select count(itemID) from item where userID = ${userID}
          and unitID = ${unitID} and pageID = ${pageID}
          and itemRecord[${item.trackid}] = 'P'`),
        query(`select count(itemID) from item where userID = ${userID}
          and unitID = ${unitID} and pageID = ${pageID}
          and itemRecord[${item.trackid}] = 'F'`)
      ])
        .then((out) => resolve({
          id: item.trackid,
          startTime: item.starttime,
          endTime: item.endtime,
          pure: Number(out[0][0].count),
          far: Number(out[1][0].count)
        }))
        .catch(reject)
    }))))
    .then((out) => resolve(out))
    .catch(reject);
});

exports.editItem = (userID, unitID, pageID, itemID, field, value) =>
  new Promise((resolve, reject) => 
    query(`update item set item${field} = '${value}'
      where userID = ${userID} and unitID = ${unitID}
      and pageID = ${pageID} and itemID = ${itemID}`)
      .then(resolve).catch(reject)
  );

exports.editTrack = (userID, unitID, pageID, itemID, trackID, value) =>
  new Promise((resolve, reject) => 
    query(`update item set itemRecord[${trackID}] = '${value}' where
      userID = ${userID} and unitID = ${unitID}
      and pageID = ${pageID} and itemID = ${itemID}`)
      .then(resolve).catch(reject)
  );

exports.deleteTrack = (userID, unitID, pageID, trackID) => {
  let trackSize;
  return new Promise((resolve, reject) =>
    query(`select itemSize from page where userID = ${userID}
      and unitID = ${unitID} and pageID = ${pageID}`)
      .then((out) => 
        Promise.all(new Array(out[0].itemsize).fill().map((_, index) => 
          query(`select itemRecord from item where userID = ${userID} and
            unitID = ${unitID} and pageID = ${pageID} and itemID = ${index + 1}`)
            .then((innerOut) => {
              let record = innerOut[0].itemrecord;
              trackSize = record.length;
              record.splice(trackID - 1, 1);
              if (!trackID || trackSize === 1) return `null`;
              else return `array${JSON.stringify(record).replace(/"/g, '\'')}`
            })
            .then((value) => query(`update item set itemRecord = ${value}
              where userID = ${userID} and unitID = ${unitID}
              and pageID = ${pageID} and itemID = ${index + 1}`))
        ))
      )
      .then(() => query(`begin; delete from track where userID = ${userID} and unitID = ${unitID}
        and pageID = ${pageID}${trackID ? ` and trackID = ${trackID}` : ""};
        update track set trackID = 1 - trackID where userID = ${userID}
        and unitID = ${unitID} and pageID = ${pageID} and trackID > ${trackID};
        update track set trackID = -trackID where userID = ${userID}
        and unitID = ${unitID} and pageID = ${pageID} and trackID < 0; commit;`))
      .then(() => query(`update page set trackSize = ${trackID ? "trackSize - 1" : "0"}
        where userID = ${userID} and unitID = ${unitID} and pageID = ${pageID}`))
      .then(() => {
        // if deleting a ongoing record
        if (trackID === trackSize || trackID === 0)
          return query(`update page set timeThis = null where
            userID = ${userID} and unitID = ${unitID} and pageID = ${pageID}`);
      })
      .then(resolve)
      .catch(reject)
  );
}
