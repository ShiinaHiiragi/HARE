import axios from "axios";
import requestURL from "./URL";

const packedGET = (params) => {
  let request = `${requestURL}${params.uri}`;
  Object.keys(params.query).forEach((item, index) => {
    request += index === 0 ? "?" : "&";
    request += `${item}=${params.query[item]}`;
  });
  return new Promise((resolve, reject) => {
    axios
      .get(request)
      .then((res) => resolve(res))
      .catch((err) => {
        params.msgbox(
          `${params.lang.message.serverError}: ${err.response.data}`,
          "error"
        );
        reject(err);
      });
  });
};

export { packedGET };
export default packedGET;
