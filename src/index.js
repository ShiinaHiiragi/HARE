import React from "react";
import ReactDOM from "react-dom";
import SignIn from "./Page/SignIn";
import Panel from "./Page/Panel";
import cookie from "react-cookies";
import axios from "axios";
import requestURL from "./Interface/Constant";

const userID = cookie.load("userID");
const token = cookie.load("token");

axios
  .get(`${requestURL}/data/check?userID=${userID}&token=${token}`)
  .then((res) => {
    if (res.data === "HARE")
      ReactDOM.render(
        <Panel userID={userID} token={token} />,
        document.getElementById("root")
      );
  })
  .catch(() => ReactDOM.render(<SignIn />, document.getElementById("root")));
