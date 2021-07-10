import axios from "axios";
import requestURL from "./Constant";
import cookie from "react-cookies";
import { oneDayMillisecond } from "./Constant";

const extendCookie = () => {
  const tomorrow = new Date(new Date().getTime() + oneDayMillisecond);
  cookie.save("userID", cookie.load("userID"), { expires: tomorrow });
  cookie.save("token", cookie.load("token"), { expires: tomorrow });
}

const packedGET = (params) => {
  const { uri, query, msgbox, kick, lang } = params;
  let request = `${requestURL}${uri}`;
  extendCookie();
  Object.keys(query).forEach((item, index) => {
    request += index === 0 ? "?" : "&";
    request += `${item}=${query[item]}`;
  });

  return new Promise((resolve, reject) => {
    axios
      .get(request)
      .then((res) => resolve(res.data))
      .catch((err) => {
        if (err.response && err.response.status !== 401) {
          msgbox(
            `${lang.message.serverError}: ${err.response.data}`,
            "error"
          );
          reject(err);
        } else if (err.response) kick();
        else msgbox(`${err}`, "error");
      });
  });
};

// config: { headers: { "Content-Type": "multipart/form-data" } }
const packedPOST = (params, config) => {
  const { uri, query, msgbox, kick, lang } = params;
  let request = `${requestURL}${uri}`;
  extendCookie();

  return new Promise((resolve, reject) => {
    axios
      .post(request, query, config)
      .then((res) => resolve(res.data))
      .catch((err) => {
        if (err.response && err.response.status !== 401) {
          msgbox(
            `${lang.message.serverError}: ${err.response.data}`,
            "error"
          );
          reject(err);
        } else if (err.response) kick();
        else msgbox(`${err}`, "error");
      });
  });
};

export { packedGET, packedPOST };
export default packedGET;
