import en from "./EN";
import zhCN from "./zh-CN";

const listMap = {
  en: en,
  "zh-CN": zhCN
};

const nameMap = {
  English: "en",
  简体中文: "zh-CN"
};

const languagePicker = (target) => {
  if (listMap[target] === undefined) return en;
  else return listMap[target];
};

export { nameMap, languagePicker };
export default languagePicker;
