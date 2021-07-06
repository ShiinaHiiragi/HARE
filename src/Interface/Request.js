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

const packedPOST = (params) => {
  const { uri, query, msgbox, kick, lang } = params;
  let request = `${requestURL}${uri}`;
  return new Promise((resolve, reject) => {
    axios
      .post(request, query)
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

export { packedGET, packedPOST };
export default packedGET;
