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
 
  // TODO: loading multi-language

  const [navList, setNavList] = React.useState(true);
  const [navListMobile, setNavListMobile] = React.useState(false);
  const toggleNavList = () => setNavList(true);
  const closeNavList = () => setNavList(false);
  const toggleNavListMobile = () => setNavListMobile(true);
  const closeNavListMobile = () => setNavListMobile(false);

  return (
    <Root>
      <CssBaseline />
      <NavBar
        state={{navList: navList}}
        handle={{
          toggleNavList: toggleNavList,
          closeNavList: closeNavList,
          toggleNavListMobile: toggleNavListMobile
        }}
      />
      <NavList
        state={{
          navList: navList,
          navListMobile: navListMobile
        }}
        handle={{closeNavListMobile: closeNavListMobile}}
      />
      <Main
        state={{navList: navList}}
      />
    </Root>
  );
}
