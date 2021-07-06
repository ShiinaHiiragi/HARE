import ReactDOM from "react-dom";
import axios from "axios";
import requestURL from "./Constant";
import SignIn from "../Page/SignIn";

const packedGET = (params) => {
  const { uri, query, msgbox, lang } = params;
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
        } else {
          console.log("INVALID OR EXPIRED");
          ReactDOM.render(<SignIn />, document.getElementById("root"));
        }
      });
  });
};

const packedPOST = (params) => {
  const { uri, query, msgbox, lang } = params;
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
        } else {
          console.log("INVALID OR EXPIRED");
          ReactDOM.render(<SignIn />, document.getElementById("root"));
        }
      });
  });
};

export { packedGET, packedPOST };
export default packedGET;
