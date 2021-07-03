import React from "react";

// const isDevMode = window.location.port === "3000";
// const requestURL = isDevMode ? "http://localhost:8000" : "";

export default function Panel(props) {
  return (
    <div> Welcome, {props.userID} </div>
  );
}
