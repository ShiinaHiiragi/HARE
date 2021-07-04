import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Root from "../Interface/Root";
import NavBar from "../Unit/NavBar";
import NavList from "../Unit/NavList";
import Main from "../Unit/Main";

const isDevMode = window.location.port === "3000";
const requestURL = isDevMode ? "http://localhost:8000" : "";

export default function Panel(props) {
  const {userID, token} = props;

  const [navList, setNavList] = React.useState(true);
  const toggleNavList = () => setNavList(true);
  const closeNavList = () => setNavList(false);

  return (
    <Root>
      <CssBaseline />
      <NavBar
        state={{navList: navList}}
        handle={{
          toggleNavList: toggleNavList,
          closeNavList: closeNavList
        }}
      />
      <NavList
        state={{navList: navList}}
      />
      <Main />
    </Root>
  );
}
