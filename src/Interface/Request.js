import axios from "axios";

const isDevMode = window.location.port === "3000";
const requestURL = isDevMode ? "http://localhost:8000" : "";

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
