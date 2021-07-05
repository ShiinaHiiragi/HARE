import ReactDOM from "react-dom";
import axios from "axios";
import requestURL from "./URL";
import SignIn from "../Page/SignIn";

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
        if (err.response.status !== 401) {
          params.msgbox(
            `${params.lang.message.serverError}: ${err.response.data}`,
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

export { packedGET };
export default packedGET;
