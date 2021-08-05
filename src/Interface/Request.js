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
  const {
    uri,
    query,
    msgbox,
    kick,
    conflict,
    lang,
    toggleLoading,
    closeLoading,
    unauthorized
  } = params;
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
        if (closeLoading)
          closeLoading();
        if (!err.response) {
          msgbox(`${err}`, "error");
          reject(err);
        } else if (![401, 409].includes(err.response.status)) {
          msgbox(
            `${lang.message.serverError}: ${err.response.data}`,
            "error"
          );
          reject(err);
        } else if (typeof unauthorized === "function")
          unauthorized();
        else if (err.response.status === 401)
          kick();
        else
          conflict();
      });
  });
};

// config: { headers: { "Content-Type": "multipart/form-data" } }
const packedPOST = (params, config) => {
  const {
    uri,
    query,
    msgbox,
    kick,
    conflict,
    lang,
    toggleLoading,
    closeLoading,
    unauthorized
  } = params;
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
        if (closeLoading)
          closeLoading();
        if (!err.response) {
          msgbox(`${err}`, "error");
          reject(err);
        } else if (![401, 409].includes(err.response.status)) {
          msgbox(
            `${lang.message.serverError}: ${err.response.data}`,
            "error"
          );
          reject(err);
        } else if (typeof unauthorized === "function")
          unauthorized();
        else if (err.response.status === 401)
          kick();
        else
          conflict();
      });
  });
};

export { packedGET, packedPOST };
export default packedGET;
