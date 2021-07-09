import axios from "axios";
import requestURL from "./Constant";

const packedGET = (params) => {
  const { uri, query, msgbox, kick, lang } = params;
  let request = `${requestURL}${uri}`;
  Object.keys(query).forEach((item, index) => {
    request += index === 0 ? "?" : "&";
    request += `${item}=${query[item]}`;
  });
  return new Promise((resolve, reject) => {
    axios
      .get(request)
      .then((res) => resolve(res.data))
      .catch((err) => {
        if (err.response.status !== 401) {
          msgbox(
            `${lang.message.serverError}: ${err.response.data}`,
            "error"
          );
          reject(err);
        } else kick();
      });
  });
};

// config: { headers: { "Content-Type": "multipart/form-data" } }
const packedPOST = (params, config) => {
  const { uri, query, msgbox, kick, lang } = params;
  let request = `${requestURL}${uri}`;
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
        else msgbox(`${lang.message.error}: ${err}`, "error");
      });
  });
};

export { packedGET, packedPOST };
export default packedGET;
