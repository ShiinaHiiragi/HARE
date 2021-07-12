import CryptoJS from "crypto-js";

const isDevMode = window.location.port === "3000";
const requestURL = isDevMode ? "http://localhost:8000" : "";

const drawerWidth = 300;
const nameMaxLength = 16, presentMaxLength = 512;
const imageMaxBase = 2 * 1024 * 1024;
const oneDayMillisecond = 24 * 3600 * 1000;
const initMenu = { mouseX: null, mouseY: null };

const defaultProfile = {
  userName: "",
  email: "",
  gender: "U",
  birth: "2019-12-31T16:00:00.000Z",
  city: "",
  tel: ""
}

const defaultColumn = (langGrid) => [
  {
    field: "id",
    headerName: langGrid.column.itemID,
    width: 160
  },
  {
    field: "query",
    headerName: langGrid.column.query,
    width: 200
  },
  {
    field: "key",
    headerName: langGrid.column.key,
    width: 200
  },
  {
    field: "time",
    headerName: langGrid.column.time,
    width: 200
  }
];

const nil = () => {};
const next = () => new Promise((resolve) => resolve);
const randomTimestamp = () => CryptoJS.MD5(new Date().toString()).toString();

const cookieTime = (daysCount) =>
  new Date(new Date().getTime() + daysCount * oneDayMillisecond);

const stringFormat = (rawString, replaceArray) => {
  for (let i = 0; i < replaceArray.length; i += 1) {
    let reg = new RegExp(`\\{${i}\\}`, "gm");
    if (reg.test(rawString))
      rawString = rawString.replace(reg, replaceArray[i]);
  }
  return rawString;
}

const timeFormat = (transDate, formatString) => {
  var formatComponent = {
    "M+": transDate.getMonth() + 1,
    "d+": transDate.getDate(),
    "h+": transDate.getHours(),
    "m+": transDate.getMinutes(),
    "s+": transDate.getSeconds(),
    "q+": Math.floor((transDate.getMonth() + 3) / 3),
    S: transDate.getMilliseconds()
  };

  if (/(y+)/.test(formatString))
    formatString = formatString.replace(
      RegExp.$1,
      (transDate.getFullYear() + "").substr(4 - RegExp.$1.length)
    );

  for (var index in formatComponent)
    if (new RegExp(`(${index})`).test(formatString))
      formatString = formatString.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? formatComponent[index]
          : ("00" + formatComponent[index]).substr(
              ("" + formatComponent[index]).length
            )
      );
  return formatString;
};

export {
  requestURL,
  drawerWidth,
  nameMaxLength,
  presentMaxLength,
  imageMaxBase,
  initMenu,
  defaultProfile,
  defaultColumn,
  nil,
  next,
  cookieTime,
  randomTimestamp,
  stringFormat,
  timeFormat
};
export default requestURL;