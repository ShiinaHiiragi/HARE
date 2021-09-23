import en from "./EN";
import zhCN from "./zh-CN";

const listMap = {
  en: en,
  "zh-CN": zhCN
};

const nameMap = {
  "English": "en",
  "简体中文": "zh-CN"
};

const languagePicker = (target) => {
  if (listMap[target] === undefined) return en;
  else return listMap[target];
};

const containLanguage = (target) => {
  if (Object.keys(listMap).includes(target)) return target;
  else return nameMap.English;
}

export { nameMap, languagePicker, containLanguage };
export default languagePicker;
