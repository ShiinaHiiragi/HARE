const SHA256 = require('crypto-js').SHA256;

// api for respond status
const invalidArgument = (res) => res.status(406).send('INVALID ARGUMENT');
const noContent = (res) => res.status(204).send();
const internalServerError = (res) => res.status(500).send('INTERNAL SERVER ERROR');
const notAuthorized = (res, msg) => res.status(401).send(msg);
const forbidden = (res, msg) => res.status(403).send(msg);
exports.invalidArgument = invalidArgument;
exports.noContent = noContent;
exports.internalServerError = internalServerError;
exports.notAuthorized = notAuthorized;
exports.forbidden = forbidden;

exports.ignore = true;
// api for sequential async
exports.syncEachChain = (arrayObject, eachTemp) =>
  arrayObject.reduce(
    (promiseChain, arrayItem, arrayIndex) =>
      promiseChain.then(() => new Promise((resolve, reject) =>
        eachTemp(arrayItem, resolve, reject, arrayIndex))),
    Promise.resolve()
  );

// api for signing up
exports.checkRegister = (cmdLine) => new Promise((resolve, reject) => {
  if (cmdLine.length < 4)
    reject('ERROR: too few arguments.\n  Try using sign <email> <username> <password>');
  else if (cmdLine[1].length > 32)
    reject('ERROR: The length of E-mail is out of range.');
  else if (!/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(cmdLine[1]))
    reject('ERROR: Unsupported E-mail address.');
  else if (cmdLine[2].length > 16)
    reject('ERROR: The length of username is out of range.');
  else if (!/^[\x0-\x7F]*$/.test(cmdLine[2]))
    reject('ERROR: The username contains illegal characters.');
  else if (cmdLine[3].length > 32 || cmdLine[3].length < 8)
    reject('ERROR: The length of password is out of range.');
  else {
    cmdLine[3] = SHA256(cmdLine[1] + cmdLine[3]).toString();
    resolve(cmdLine);
  }
})

// api for formatting
exports.arrayTupleString = (arr) =>
  JSON.stringify(arr).replace(/\[/, '(').replace(/\]/, ')');
exports.arrayLostString = (size) => {
  let res = size ? '[\'L\'' : '[';
  if (size) res += ', \'L\''.repeat(size - 1);
  return res + ']';
}
exports.format = (transDate, formatString) => {
  var formatComponent = {
    'M+': transDate.getMonth() + 1,
    'd+': transDate.getDate(),
    'h+': transDate.getHours(),
    'm+': transDate.getMinutes(),
    's+': transDate.getSeconds(),
    'q+': Math.floor((transDate.getMonth() + 3) / 3),
    S: transDate.getMilliseconds()
  };

  if (/(y+)/.test(formatString))
    formatString = formatString.replace(
      RegExp.$1,
      (transDate.getFullYear() + '').substr(4 - RegExp.$1.length)
    );

  for (var index in formatComponent)
    if (new RegExp(`(${index})`).test(formatString))
      formatString = formatString.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? formatComponent[index]
          : ('00' + formatComponent[index]).substr(
              ('' + formatComponent[index]).length
            )
      );
  return formatString;
};

// string is not null and String can be null
paramMap = {
  token: 'string',
  userID: 'number',
  unitID: 'number',
  pageID: 'number',
  trackID: 'number',
  itemID: 'array',
  pure: 'array',
  far: 'array',
  src: 'number',
  dst: 'number',
  bool: 'boolean',
  email: 'string',
  password: 'string',
  userName: 'string',
  unitName: 'string',
  pageName: 'string',
  gender: 'string',
  birth: 'string',
  avatar: 'string',
  type: 'string',
  track: 'string',
  tel: 'String',
  city: 'String',
  pagePresent: 'String',
  query: 'String',
  key: 'String'
};

// TODO: remove console.log
exports.param = (src, dst, list, res, ignore) => new Promise((resolve) => {
  const supLength = list.length;
  for (let supIndex = 0; supIndex < supLength; supIndex += 1) {
    const keyName = list[supIndex];
    const paramType = paramMap[keyName].toLowerCase();
    if (!ignore && src[keyName] === undefined) {
      console.log(keyName, "undefined")
      invalidArgument(res);
      return;
    } else if (src[keyName] !== undefined) {
      if (paramType === 'number') {
        const paramNumber = Number(src[keyName]);
        if (isNaN(paramNumber)) {
          console.log("not a number")
          invalidArgument(res);
          return;
        }
        dst[keyName] = paramNumber;
      } else if (paramType === 'string') {
        const paramString = String(src[keyName]).replace(/'/g, `''`);
        if (paramMap[keyName][0] === 's' && paramString.length === 0) {
          console.log("nil string")
          invalidArgument(res);
          return;
        }
        dst[keyName] = paramString
      } else if (paramType === 'array') {
        if (!(src[keyName] instanceof Array)) {
          console.log("not array")
          invalidArgument(res);
          return;
        }
        const length = src[keyName].length;
        dst[keyName] = new Array(length).fill(0);
        for (let index = 0; index < length; index += 1) {
          const subNumber = Number(src[keyName][index]);
          if (isNaN(subNumber)) {
            console.log("nan in array")
            invalidArgument(res);
            return;
          } else dst[keyName][index] = subNumber;
        }
      } else dst[keyName] = !!src[keyName]
    }
  }
  resolve();
});

// other api
exports.sqlNumberArray = (query) => {
  if (!(query instanceof Array)) {
    const numberVerify = Number(query);
    return isNaN(numberVerify) ? -1 : numberVerify;
  }
  let sql = new Array(query.length).fill();
  let invalid = false;
  query.forEach((item, index) => {
    const numberVerify = Number(item);
    sql[index] = isNaN(numberVerify) ? -1 : numberVerify;
  });
  return invalid ? new Array() : sql;
}

exports.sqlNumber = (query, keys, res) => {
  let sql = new Object();
  let invalid = false;
  keys.forEach((item) => {
    if (query[item] === undefined) {
      if (res) invalidArgument(res);
      invalid = true;
      return;
    }
    const numberVerify = Number(query[item]);
    sql[item] = isNaN(numberVerify) ? -1 : numberVerify;
  });
  return invalid ? new Object() : sql;
}

exports.sqlString = (query, keys, res) => {
  let sql = new Object();
  let invalid = false;
  keys.forEach((item) => {
    if (query[item] === undefined) {
      if (res) invalidArgument(res);
      invalid = true;
      return;
    }
    sql[item] = query[item].replace(/'/g, `''`);
  })
  return invalid ? new Object() : sql;
}

exports.sqlID = (userID, unitID, pageID) => {
  return (userID ? `userID = ${userID}` : "")
    + (unitID ? ` and unitID = ${unitID}` : "")
    + (pageID ? ` and pageID = ${pageID}` : "");
}
