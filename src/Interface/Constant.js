import CryptoJS from "crypto-js";
import cookie from "react-cookies"
import markdownToTxt from "markdown-to-txt";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CloseIcon from "@material-ui/icons/Close";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import InsertInvitationOutlinedIcon from "@material-ui/icons/InsertInvitationOutlined";
import AlarmOutlinedIcon from "@material-ui/icons/AlarmOutlined";
import InboxOutlinedIcon from "@material-ui/icons/InboxOutlined";

// used for distinguishing dev and release mode
const isDevMode = window.location.port === "3000";
const requestURL = isDevMode ? "http://localhost" : "";
export { isDevMode, requestURL };

// the information of the autor
const author = "Ichinoe";
const email = "IchinoeMizue@outlook.com";
export { author, email };

// the api function for version
const innerVersionBit = 4;
const versionLatest = (log, defaultVersion = "0.0.0") => log?.[0]?.["version"] ?? defaultVersion;
const versionParser = (version, bits = 3) => version.match(/\d+/g).slice(0, bits).join(".");
const disjunctVersion = (version, bits = innerVersionBit) => {
  const versionArray = String(version).match(/\d+/g) ?? [];
  return versionArray.map(Number).concat(new Array(bits).fill(0)).slice(0, bits)
}
export { innerVersionBit, versionLatest, versionParser, disjunctVersion }

// some constants about limit volumn
// the server receive up to 1.5 MB per request
// each user stores data no more than 2 ~ 2.4 GB
// image: less than 1.33 MB, equaling to image of 1MB
// entry: 8 units × 16 pages × 64 entries × 32 KB = 0.25 GB
// graphic： 8 units × 16 pages × 16 images × 1MB = 2 GB
const maxRecall = 64;
const maxLog = 256;
const maxFrequency = 16;
const maxNameLength = 16;
const maxPresentLength = 512;
const maxImageBase = 1398101;
const maxItemByte = 32768;
export {
  maxRecall,
  maxLog,
  maxFrequency,
  maxNameLength,
  maxPresentLength,
  maxImageBase,
  maxItemByte
};

// the ranges of password
const rangePassword = [8, 32];
export { rangePassword };

// some constants about agreement configuration
const defaultDigit = 2;
const setStateDelay = 400;
const leaveDelay = 200;
const lineReg = /< *(?:line|underline|cloze)(?: +(?:size|length|width) *= *\{(\d+)\})? *\/? *>/g;
const imageReg = [
  /!\[(.*?)\]\(\/?src\/image\?unitID=(\d+)\&pageID=(\d+)\&imageID=(\d+).*?\)/g,
  /(<img.*?src=[\"|\']?)\/?src\/image\?unitID=(\d+)\&pageID=(\d+)\&imageID=(\d+).*?([\"|\']?\s.*?>)/g
]
const checkLineReg = () => new RegExp(`^${lineReg.source}$`);
const checkImageReg = () => imageReg.map((item) => new RegExp(`^${item.source}$`));
const underline = "<line>";
const emSpace = "&emsp;"
export {
  defaultDigit,
  setStateDelay,
  leaveDelay,
  lineReg,
  imageReg,
  checkLineReg,
  checkImageReg,
  underline,
  emSpace
};

// the info about user interface
const drawerWidth = 320;
const routeIndex = { intro: 0, cover: 1, view: 2, stat: 3, recall: 4, gallery: 5 };
const pageIcon = (iconProps) => [
  <TurnedInNotIcon {...iconProps} />,
  <PlaylistAddCheckIcon {...iconProps} />,
  <InsertInvitationOutlinedIcon {...iconProps} />,
  <AlarmOutlinedIcon {...iconProps} />,
  <InboxOutlinedIcon {...iconProps} />
];
export { drawerWidth, routeIndex, pageIcon };

// the initial state of some object state
const initialDate = "2019-12-31T16:00:00.000Z";
const hideAnswerString = "#".repeat(20);
const initMenu = { mouseX: null, mouseY: null };
const defaultProfile = { userName: "", email: "", gender: "U", birth: initialDate, city: "", tel: "" };
const defaultRange = { maxUnit: 8, maxPage: 16, maxItem: 64, maxImg: 16 };
const defaultPageDetail = { pageCreateTime: initialDate, itemSize: 0, trackSize: 0, timeThis: null };
const defaultCurrentSelect = {
  pageName: "HARE",
  pagePresent: "",
  prevRoute: -1,
  route: routeIndex.intro
};
const defaultColumn = (langGrid, showKey) => [
  {
    field: "id",
    type: "number",
    headerName: langGrid?.column?.itemID,
    width: 160,
    align: "center",
    headerAlign: "center"
  },
  {
    field: "time",
    type: "dateTime",
    headerName: langGrid?.column?.time,
    valueFormatter: (param) =>
      timeFormat(param.value, langGrid.inherent.timeFormatStringFilter),
    width: 200,
    align: "center",
    headerAlign: "center"
  },
  {
    field: "query",
    headerName: langGrid?.column?.query,
    width: 200,
    valueFormatter: (param) => markdownToTxt(param.value),
    headerAlign: "center"
  },
  {
    field: "key",
    headerName: langGrid?.column?.key,
    width: 200,
    valueFormatter: (param) => showKey ? markdownToTxt(param.value) : hideAnswerString,
    headerAlign: "center"
  }
];
export {
  initMenu,
  defaultProfile,
  defaultRange,
  defaultPageDetail,
  defaultCurrentSelect,
  defaultColumn
};

// some functions which are often used
const nil = () => {};
const next = () => new Promise((resolve) => resolve);
const randomTimestamp = () => CryptoJS.MD5(new Date().toString()).toString();
const encryptPassword = (password, email) => CryptoJS.SHA512(email + password).toString();
const cookieTime = (daysCount) =>
  new Date(new Date().getTime() + daysCount * (24 * 3600 * 1000));
const rankMap = { "X": "A", "S": "B", "A": "C", "B": "D", "C": "E", "D": "F" };
const getRank = (value, toLow) => {
  const rank = value < 72 ? "D" : value < 84 ? "C" : value < 92 ?
    "B" : value < 96 ? "A" : value < 100 ? "S" : "X";
  return toLow ? rankMap[rank] : rank;
}
const byteSize = str => new Blob([str]).size;
export {
  nil,
  next,
  encryptPassword,
  cookieTime,
  randomTimestamp,
  getRank,
  byteSize
};

// functions which are not used so often
const markMap = {
  "P": <RadioButtonUncheckedIcon fontSize="inherit" />,
  "F": <CloseIcon fontSize="inherit" />,
  "L": <ChangeHistoryIcon fontSize="inherit" />
}
const lostGenerator = (trackSize) => {
  const resultObject = {};
  for (let index = 0; index < trackSize; index += 1)
    resultObject[index + 1] = "L";
  return resultObject;
}
const underlineLength = (size) => {
  if (size <= 4) return 4;
  else if (size <= 8) return 8;
  else if (size <= 12) return 12;
  else if (size <= 16) return 16;
  else return 20;
}
const cookieSetting = (cookieName, setState) => {
  const storageCookie = cookie.load(cookieName);
  if (storageCookie === undefined) {
    cookie.save(cookieName, true, { expires: cookieTime(3650) });
  } else if (storageCookie !== "true") {
    setState(false);
    cookie.save(cookieName, false, { expires: cookieTime(3650) });
  }
}
export { markMap, lostGenerator, underlineLength, cookieSetting };

// function about markdown blank and code
const inlineCode = "``"
const autoKey = "{{}}";
const autoKeyReg = [/^{{(.+?)}}/, /([^\\]){{(.+?)}}/g];
const autoQuery = (query) => {
  let keys = [];
  query = query.replace(autoKeyReg[0], (_, answer) => {
    keys.push(answer);
    return `<line size={${underlineLength(answer.length)}}>`;
  }).replace(autoKeyReg[1], (_, before, answer) => {
    keys.push(answer);
    return `${before}<line size={${underlineLength(answer.length)}}>`;
  })
  return { query: query, keys: keys }
}
const autoKeys = (keys, lang) => {
  return `${keys.join("  \n")}\n\n${
    keys.length
    ? `<p align="right" style="color: #999;">${lang.popup.newItem.autoGenerate}</p>`
    : `<p align="left" style="color: #999;">${lang.popup.newItem.noTag}</p>`
  }`;
};
export { inlineCode, autoKey, autoQuery, autoKeys };

// function about formatting
const stringFormat = (rawString, replaceArray) => {
  for (let i = 0; i < replaceArray.length; i += 1) {
    let reg = new RegExp(`\\{${i}\\}`, "gm");
    if (reg.test(rawString))
      rawString = rawString.replace(reg, replaceArray[i]);
  }
  return rawString;
};

const timeFormat = (transDate, formatString) => {
  if (typeof transDate === "string")
    transDate = new Date(transDate);
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
export { stringFormat, timeFormat };

// function about async function and images
const syncEachChain = (arrayObject, eachTemp) =>
  arrayObject.reduce(
    (promiseChain, arrayItem, arrayIndex) =>
      promiseChain.then(() => new Promise((resolve, reject) =>
        eachTemp(arrayItem, resolve, reject, arrayIndex))),
    Promise.resolve()
  );

const imageURL = (id, time, unitID, pageID) => `${requestURL}/src/image` +
  `?unitID=${unitID}&pageID=${pageID}&imageID=${id}` +
  `&t=${CryptoJS.MD5(time)}`;

// use for preview
const localMarkdown = (text) => text.replace(lineReg, (_, num) => {
  const size = Number(num);
  return `<u>${"\u2003".repeat(!size || isNaN(size) ? 8 : size)}</u>`
})

const downloadMarkdown = (text) => text.replace(lineReg, (_, num) => {
  const size = Number(num);
  return "\\_\\_".repeat(!size || isNaN(size) ? 8 : size)
})

// use for downloading
const downloadQuestion = (item) => {
  const swapAnsTag = item.key.length ? item : autoQuery(item.query);
  return downloadMarkdown(swapAnsTag.query);
}

const downloadAnswer = (item, synthesis) => {
  const swapAnsTag = item.key.length ? item : autoQuery(item.query);
  let ansString;
  if (swapAnsTag.keys instanceof Array) {
    ansString = swapAnsTag.keys.join("  \n");
    if (swapAnsTag.keys.length)
      synthesis[0] = true;
  } else {
    ansString = swapAnsTag.key;
  }
  return downloadMarkdown(ansString);
}

const downloadSynthesis = (item) => {
  const swapAns = item.key.length
    ? item.query
    : item.query
      .replace(autoKeyReg[0], (_, answer) => answer)
      .replace(autoKeyReg[1], (_, before, answer) => `${before}${answer}`)
  return downloadMarkdown(swapAns);
}

export { syncEachChain, imageURL, localMarkdown, downloadQuestion, downloadAnswer, downloadSynthesis };
export default requestURL;
