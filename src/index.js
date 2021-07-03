import React from "react";
import ReactDOM from "react-dom";
import SignIn from "./Page/SignIn";
import Panel from "./Page/Panel";
import cookie from "react-cookies";

const userID = cookie.load("userID");
ReactDOM.render(
  userID ? <Panel userID={userID}/> : <SignIn />,
  document.getElementById("root")
);
