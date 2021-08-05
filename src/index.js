import React from "react";
import ReactDOM from "react-dom";
import SignIn from "./Page/SignIn";
import Panel from "./Page/Panel";
import cookie from "react-cookies";
import axios from "axios";
import requestURL from "./Interface/Constant";

const userID = Number(cookie.load("userID"));
const token = cookie.load("token");

axios.defaults.withCredentials = true;
axios
  .get(`${requestURL}/data/check`)
  .then((res) => {
    ReactDOM.render(
      <Panel userID={userID} token={token} session={res.data} />,
      document.getElementById("root")
    );
  })
  .catch(() => ReactDOM.render(<SignIn />, document.getElementById("root")));
