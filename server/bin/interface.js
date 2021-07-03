// async version of forEach
const syncEachChain = (arrayObject, eachTemp) =>
arrayObject.reduce(
  (promiseChain, arrayItem) =>
    promiseChain.then(() => new Promise((resolve, reject) =>
      eachTemp(arrayItem, resolve, reject))),
  Promise.resolve()
);

exports.syncEachChain = syncEachChain;