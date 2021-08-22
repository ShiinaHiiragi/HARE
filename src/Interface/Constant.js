import CryptoJS from "crypto-js";
import markdownToTxt from "markdown-to-txt";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import InsertInvitationOutlinedIcon from "@material-ui/icons/InsertInvitationOutlined";
import AlarmOutlinedIcon from "@material-ui/icons/AlarmOutlined";
import InboxOutlinedIcon from "@material-ui/icons/InboxOutlined";
import log from "../Language/Log";

// used for distinguishing dev and release mode
const isDevMode = window.location.port === "3000";
const requestURL = isDevMode ? "http://localhost:8000" : "";
export { isDevMode, requestURL };

// the information of the autor
const author = "Ichinoe";
const email = "IchinoeMizue@outlook.com";
const version = log[0].version;
export { author, version, email };

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
const underline = "<u>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</u>";
const emSpace = "&emsp;"
export { defaultDigit, setStateDelay, underline, emSpace };

// the info about user interface
const drawerWidth = 320;
const routeIndex = { intro: 0, cover: 1, view: 2, stat: 3, recall: 4 };
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
const initMenu = { mouseX: null, mouseY: null };
const defaultProfile = { userName: "", email: "", gender: "U", birth: initialDate, city: "", tel: "" };
const defaultRange = { maxUnit: 8, maxPage: 16, maxItem: 64, maxImg: 16 };
const defaultPageDetail = { pageCreateTime: initialDate, itemSize: 0, trackSize: 0, timeThis: null };
const defaultCurrentSelect = { pageName: "HARE", pagePresent: "", route: routeIndex.intro };
const defaultColumn = (langGrid) => [
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
      timeFormat(new Date(param.value), langGrid.column.timeFormatString),
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
    valueFormatter: (param) => markdownToTxt(param.value),
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
const cookieTime = (daysCount) =>
  new Date(new Date().getTime() + daysCount * (24 * 3600 * 1000));
const rankMap = { "X": "A", "S": "B", "A": "C", "B": "D", "C": "E", "D": "F" };
const getRank = (value, toLow) => {
  const rank = value < 72 ? "D" : value < 84 ? "C" : value < 92 ?
    "B" : value < 96 ? "A" : value < 100 ? "S" : "X";
  return toLow ? rankMap[rank] : rank;
}
const byteSize = str => new Blob([str]).size;
export { nil, next, cookieTime, randomTimestamp, getRank, byteSize };

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
export default requestURL;
