import axios from "axios";
import requestURL from "./Constant";
import cookie from "react-cookies";
import { cookieTime } from "./Constant";

axios.defaults.withCredentials = true;
const extendCookie = () => {
  cookie.save("userID", cookie.load("userID"), { expires: cookieTime(1) });
  cookie.save("token", cookie.load("token"), { expires: cookieTime(1) });
};

const packedGET = (params) => {
  const { uri, query, msgbox, kick, lang, toggleLoading, closeLoading } = params;
  let request = `${requestURL}${uri}`;
  extendCookie();
  if (toggleLoading) toggleLoading();
  Object.keys(query).forEach((item, index) => {
    request += index === 0 ? "?" : "&";
    request += `${item}=${query[item]}`;
  });

  return new Promise((resolve, reject) => {
    axios
      .get(request)
      .then((res) => {
        if (closeLoading) closeLoading();
        resolve(res.data);
      })
      .catch((err) => {
        if (closeLoading) closeLoading();
        if (!err.response) {
          msgbox(`${err}`, "error");
          reject(err);
        } else if (err.response.status !== 401) {
          msgbox(`${lang.message.serverError}: ${err.response.data}`, "error");
          reject(err);
        } else kick();
      });
  });
};

// config: { headers: { "Content-Type": "multipart/form-data" } }
const packedPOST = (params, config) => {
  const { uri, query, msgbox, kick, lang, toggleLoading, closeLoading } = params;
  let request = `${requestURL}${uri}`;
  extendCookie();
  if (toggleLoading) toggleLoading();

  return new Promise((resolve, reject) => {
    axios
      .post(request, query, config)
      .then((res) => {
        if (closeLoading) closeLoading();
        resolve(res.data);
      })
      .catch((err) => {
        if (closeLoading) closeLoading();
        if (!err.response) {
          msgbox(`${err}`, "error");
          reject(err);
        } else if (err.response.status !== 401) {
          msgbox(`${lang.message.serverError}: ${err.response.data}`, "error");
          reject(err);
        } else kick();
      });
  });
};

export { packedGET, packedPOST };
export default packedGET;
