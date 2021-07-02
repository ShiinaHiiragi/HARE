import en from "./EN";
import zhCN from "./zh-CN";

const listMap = {
  "en": en,
  "zh-CN": zhCN
}

export default function languageSelector(target) {
  if (listMap[target] !== undefined)
    return listMap[target];
  else return en;
}