import en from "./EN";
import zhCN from "./zh-CN";

const listMap = {
  "en": en,
  "zh-CN": zhCN,
}

const nameMap = {
  "English": "en",
  "简体中文": "zh-CN",
}

const languagePicker = (target) => {
  if (listMap[target] !== undefined)
    return listMap[target];
  else return en;
}

export {
  nameMap,
  languagePicker
}
export default languagePicker;