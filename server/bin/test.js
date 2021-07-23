const sqlNumberArray = (query, res) => {
  let sql = new Array(query.length).fill();
  let invalid = false;
  query.forEach((item, index) => {
    const numberVerify = Number(item);
    sql[index] = isNaN(numberVerify) ? -1 : numberVerify;
  });
  return invalid ? new Array() : sql;
}

console.log(sqlNumberArray([{}, 24, "123", "-7", "0-"]));