import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import cookie from "react-cookies";
import Root from "../Interface/Root";
import NavBar from "../Unit/NavBar";
import NavList from "../Unit/NavList";
import Main from "../Unit/Main";
import { languagePicker } from "../Language/Lang";
import MessageBox from "../Dialogue/MessageBox";
import Load from "../Dialogue/Load";

const isDevMode = window.location.port === "3000";
const requestURL = isDevMode ? "http://localhost:8000" : "";

export default function Panel(props) {
  const { userID, token } = props;

  // detect if the language information is stored
  let storageLang = cookie.load("lang");
  if (storageLang === undefined) {
    cookie.save("lang", "en", {
      expires: new Date(new Date().getTime() + 10 * 365 * 24 * 3600 * 1000)
    });
    storageLang = "en";
  }
  const [globalLang, setGlobalLang] = React.useState(
    languagePicker(storageLang)
  );
  const changeGlobalLang = (targetValue) => {
    if (targetValue) setGlobalLang(languagePicker(targetValue));
    cookie.save("lang", targetValue, {
      expires: new Date(new Date().getTime() + 10 * 365 * 24 * 3600 * 1000)
    });
  };

  // the sharing state of response navigation bar and list
  const [navList, setNavList] = React.useState(true);
  const [navListMobile, setNavListMobile] = React.useState(false);
  const [navBarTitle, setNavBarTitle] = React.useState("HARE");

  // the setting of snackbar
  const [messageBoxInfo, setMessageBoxInfo] = React.useState({
    open: false,
    type: "success",
    message: ""
  });
  const toggleMessageBox = (message, type) => {
    setMessageBoxInfo({
      open: true,
      type: type,
      message: message
    });
  };
  const closeMessageBox = () => {
    setMessageBoxInfo((snackbarInfo) => ({
      ...snackbarInfo,
      open: false
    }));
  };

  // the state of loading scene
  let clockLoading = null;
  const [loading, setLoading] = React.useState(false);
  const toggleLoading = () =>
    (clockLoading = setTimeout(() => {
      clockLoading = null;
      setLoading(true);
    }, 1000));
  const closeLoading = () => {
    if (clockLoading) clearTimeout(clockLoading);
    setLoading(false);
  };

  return (
    <Root>
      <CssBaseline />
      <NavBar
        lang={globalLang}
        state={{
          navList: navList,
          navBarTitle: navBarTitle
        }}
        handle={{
          toggleNavList: () => setNavList(true),
          closeNavList: () => setNavList(false),
          toggleNavListMobile: () => setNavListMobile(true)
        }}
      />
      <NavList
        lang={globalLang}
        state={{
          navList: navList,
          navListMobile: navListMobile
        }}
        handle={{ closeNavListMobile: () => setNavListMobile(false) }}
      />
      <Main lang={globalLang} state={{ navList: navList }} />
      <MessageBox
        open={messageBoxInfo.open}
        handleClose={closeMessageBox}
        messageBoxType={messageBoxInfo.type}
        messageBoxMessage={messageBoxInfo.message}
      />
      <Load open={loading} />
    </Root>
  );
}
