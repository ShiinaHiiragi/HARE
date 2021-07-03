// async version of forEach
exports.syncEachChain = (arrayObject, eachTemp) =>
arrayObject.reduce(
  (promiseChain, arrayItem) =>
    promiseChain.then(() => new Promise((resolve, reject) =>
      eachTemp(arrayItem, resolve, reject))),
  Promise.resolve()
);

exports.exec = (cmdLine) => new Promise((resolve, reject) => {
  console.log(cmdLine);
  resolve();
})