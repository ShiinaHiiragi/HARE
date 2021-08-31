var CryptoJS = require('crypto-js');

// api for constants
exports.ignore = true;
exports.tokenLifeSpan = 24 * 3600 * 1000;
exports.maxRecall = 64;
exports.typeReg = /^data:image\/(\w+);base64,/;
exports.super = {
  unit: "userSetting",
  page: "unit",
  item: "page"
};

const maxItemByte = 32768;
const byteSize = (str) => Buffer.from(str).length;

// api for respond status
const noContent = (res) => res.status(204).send();
const notAuthorized = (res, msg) => res.status(401).send(msg);
const forbidden = (res, msg) => res.status(403).send(msg);
const invalidArgument = (res) => res.status(406).send('INVALID ARGUMENT');
const conflict = (res) => res.status(409).send('PARALLEL CONFLICT');
const internalServerError = (res) => res.status(500).send('INTERNAL SERVER ERROR');

exports.noContent = noContent;
exports.notAuthorized = notAuthorized;
exports.forbidden = forbidden;
exports.invalidArgument = invalidArgument;
exports.conflict = conflict;
exports.internalServerError = internalServerError;
exports.catchError = (err, res, msg) => {
  switch (err) {
    case 403: forbidden(res, msg); break;
    case 406: invalidArgument(res); break;
    default: internalServerError(res); break;
  }
}

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
    cmdLine[3] = CryptoJS.SHA512(cmdLine[1] + cmdLine[3]).toString();
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
exports.typeFormat = (type) => type === '.jpeg' ? '.jpg' : type;

// string is not null and String can be null
const maxNameLength = 16;
const maxEmailLength = 32;
const maxPresentLength = 512;

const passwordLength = 128;
const genderRange = ['U', 'F', 'M'];
const trackRange = ['P', 'F', 'L'];
const paramMap = {
  token: 'string',
  session: 'string',
  userID: 'number',
  unitID: 'number',
  pageID: 'number',
  trackID: 'number',
  imageID: 'number',
  itemID: 'array',
  pure: 'array',
  far: 'array',
  src: 'number',
  dst: 'number',
  bool: 'boolean',
  email: 'string',
  password: 'string',
  newPassword: 'string',
  userName: 'string',
  unitName: 'string',
  pageName: 'string',
  imageName: 'string',
  gender: 'string',
  birth: 'string',
  image: 'string',
  type: 'string',
  track: 'string',
  tel: 'String',
  city: 'String',
  pagePresent: 'String',
  query: 'String',
  key: 'String',
  items: 'objectArray'
};

// ignore: ignore undefined attribute though it is in the list
exports.param = (src, dst, list, res, ignore) => new Promise((resolve) => {
  let supLength = list.length, invalid = false;
  loop: for (let supIndex = 0; supIndex < supLength; supIndex += 1) {
    const keyName = list[supIndex];
    const paramType = paramMap[keyName].toLowerCase();
    if (!ignore && src[keyName] === undefined) {
      invalid = true; break loop;
    }
    else if (src[keyName] !== undefined) {
      if (paramType === 'number') {
        const paramNumber = Number(src[keyName]);
        if (isNaN(paramNumber)) {
          invalid = true; break loop;
        }
        dst[keyName] = paramNumber;
      } else if (paramType === 'string') {
        const paramString = String(src[keyName]).replace(/'/g, `''`);
        if (paramMap[keyName][0] === 's' && paramString.length === 0) {
          invalid = true; break loop;
        }
        if (keyName === 'token' && paramString.length !== 64) {
          invalid = true; break loop;
        }
        if (keyName === 'session' && paramString.length !== 56) {
          invalid = true; break loop;
        }
        if ((['userName', 'unitName', 'pageName', 'imageName', 'tel', 'city']
          .includes(keyName) && paramString.length > maxNameLength) ||
          (keyName === 'email' && paramString.length > maxEmailLength) ||
          (keyName === 'password' && paramString.length !== passwordLength) ||
          (keyName === 'newPassword' && paramString.length !== passwordLength) ||
          (keyName === 'pagePresent' && paramString.length > maxPresentLength)) {
            invalid = true; break loop;
          }
        if ((keyName === 'gender' && !genderRange.includes(paramString)) ||
          (keyName === 'track' && !trackRange.includes(paramString))) {
          invalid = true; break loop;
        }
        if (keyName === 'birth' &&
          (isNaN(new Date(paramString)) ||
          (new Date() - new Date(paramString) < 0))) {
          invalid = true; break loop;
        }
        if ((keyName === 'query' || keyName === 'key') &&
          byteSize(paramString) > maxItemByte) {
          invalid = true; break loop;
        }
        dst[keyName] = paramString
      } else if (paramType === 'array') {
        if (!(src[keyName] instanceof Array)) {
          invalid = true; break loop;
        }
        const length = src[keyName].length;
        dst[keyName] = new Array(length).fill(0);
        for (let index = 0; index < length; index += 1) {
          const subNumber = Number(src[keyName][index]);
          if (isNaN(subNumber)) {
            invalid = true; break loop;
          }
          else dst[keyName][index] = subNumber;
        }
      } else if (paramType === 'objectarray') {
        if (!(src[keyName] instanceof Array)) {
          invalid = true; break loop;
        }
        const length = src[keyName].length;
        for (let index = 0; index < length; index += 1) {
          if (typeof src[keyName][index] !== 'object') {
            invalid = true; break loop;
          }
        }
        // dst[keyName][index] is not checked yet in this branch
        dst[keyName] = src[keyName];
      } else dst[keyName] = !!src[keyName]
    }
  }
  invalid ? invalidArgument(res) : resolve();
});

// only useful for checkRange
exports.sqlID = (userID, unitID, pageID, itemID) => {
  return (unitID ? `userID = ${userID}` : '')
    + (pageID ? ` and unitID = ${unitID}` : '')
    + (itemID ? ` and pageID = ${pageID}` : '');
}
