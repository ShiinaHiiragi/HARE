const SHA256 = require('crypto-js').SHA256;

exports.syncEachChain = (arrayObject, eachTemp) =>
  arrayObject.reduce(
    (promiseChain, arrayItem, arrayIndex) =>
      promiseChain.then(() => new Promise((resolve, reject) =>
        eachTemp(arrayItem, resolve, reject, arrayIndex))),
    Promise.resolve()
  );

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

const invalidArgument = (res) => res.status(406).send('INVALID ARGUMENT');
exports.invalidArgument = invalidArgument;
exports.noContent = (res) => res.status(204).send();
exports.internalServerError = (res) => res.status(500).send('INTERNAL SERVER ERROR');

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

exports.arrayString = (size) => {
  let res = size ? '[\'L\'' : '[';
  if (size) res += ', \'L\''.repeat(size - 1);
  return res + ']';
}

exports.sqlID = (userID, unitID, pageID) => {
  return (userID ? `userID = ${userID}` : "")
    + (unitID ? ` and unitID = ${unitID}` : "")
    + (pageID ? ` and pageID = ${pageID}` : "");
}

exports.arrayTupleString = (arr) =>
  JSON.stringify(arr).replace(/\[/, '(').replace(/\]/, ')');