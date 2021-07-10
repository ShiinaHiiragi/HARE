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

const nil = () => {};
const next = () => new Promise((resolve) => resolve);
const randomTimestamp = () => CryptoJS.MD5(new Date().toString()).toString();

const stringFormat = (rawString, replaceArray) => {
  for (let i = 0; i < replaceArray.length; i += 1) {
    let reg = new RegExp(`\\{${i}\\}`, "gm");
    if (reg.test(rawString))
      rawString = rawString.replace(reg, replaceArray[i]);
  }
  return rawString;
}

export {
  requestURL,
  drawerWidth,
  nameMaxLength,
  presentMaxLength,
  imageMaxBase,
  initMenu,
  oneDayMillisecond,
  defaultProfile,
  nil,
  next,
  randomTimestamp,
  stringFormat
};
export default requestURL;