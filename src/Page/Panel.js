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
import Kick from "../Dialogue/Kick";
import packedGET from "../Interface/Request";
import { oneDayMillisecond } from "../Interface/Constant";
import { defaultProfile } from "../Interface/Constant";

export default function Panel(props) {
  const { userID, token } = props;

  // detect if the language information is stored
  let storageLang = cookie.load("lang");
  const tenYears = new Date(new Date().getTime() + 10 * 365 * oneDayMillisecond);
  if (storageLang === undefined) {
    storageLang = "en";
    cookie.save("lang", "en", { expires: tenYears });
  }
  const [globalLang, setGlobalLang] = React.useState(languagePicker(storageLang));
  const changeGlobalLang = (targetValue) => {
    if (targetValue) setGlobalLang(languagePicker(targetValue));
    cookie.save("lang", targetValue, { expires: tenYears });
  };

  // the sharing state of response navigation bar and list
  const [navList, setNavList] = React.useState(true);
  const [navListMobile, setNavListMobile] = React.useState(false);
  const [listObject, setListObject] = React.useState([]);
  React.useEffect(() => {
    packedGET({
      uri: "/data/unit",
      query: { userID: userID, token: token },
      msgbox: toggleMessageBox,
      kick: () => setKick(true),
      lang: globalLang
    })
      .then((res) => setListObject(res));
  }, []);

  // the sharing state of profile
  const [profile, setProfile] = React.useState(defaultProfile);
  React.useEffect(() => {
    packedGET({
      uri: "/data/profile",
      query: { userID: userID, token: token },
      msgbox: toggleMessageBox,
      kick: () => setKick(true),
      lang: globalLang
    })
      .then((res) => setProfile({
        userName: res.username, email: res.email,
        gender: res.gender, birth: res.birth,
        city: res.city || "", tel: res.tel || ""
      }));
  }, []);

  // the sharing state of selected page
  const [currentSelect, setCurrentSelect] = React.useState({
    pageName: "HARE", pagePresent: "", route: 0
  });
  React.useEffect(() => {
    let selectedUnit = listObject.find((item) => item.selected), selectedPage;
    if (selectedUnit) selectedPage = selectedUnit.pages.find((item) => item.selected);
    if (selectedPage) {
      setCurrentSelect({
        unitID: selectedUnit.unitID,
        unitName: selectedUnit.unitName,
        pageID: selectedPage.pageID,
        pageName: selectedPage.pageName,
        pageCover: selectedPage.pageCover,
        pagePresent: selectedPage.pagePresent,
        route: selectedPage.route
      });
    } else {
      setCurrentSelect ({
        pageName: "HARE", pagePresent: "", route: 0
      })
    }
  }, [listObject]);

  // the setting of disconnection message box
  const [kick, setKick] = React.useState(false);
  const [messageBoxInfo, setMessageBoxInfo] = React.useState({
    open: false, type: "success", message: ""
  });
  const toggleMessageBox = (message, type) => {
    setMessageBoxInfo({ open: true, type: type, message: message });
  };
  const closeMessageBox = () => {
    setMessageBoxInfo((messageBoxInfo) => ({
      ...messageBoxInfo, open: false
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
        state={{
          navList: navList,
          currentSelect: currentSelect
        }}
        handle={{
          toggleNavList: () => setNavList(true),
          closeNavList: () => setNavList(false),
          toggleNavListMobile: () => setNavListMobile(true)
        }}
      />
      <NavList
        lang={globalLang}
        data={{
          userID: userID,
          token: token
        }}
        state={{
          profile: profile,
          navList: navList,
          route: currentSelect.route,
          navListMobile: navListMobile,
          listObject: listObject
        }}
        handle={{
          toggleMessageBox: toggleMessageBox,
          toggleLoading: toggleLoading,
          closeLoading: closeLoading,
          toggleKick: () => setKick(true),
          closeNavListMobile: () => setNavListMobile(false),
          changeGlobalLang: changeGlobalLang,
          setListObject: setListObject,
          setProfile: setProfile,
        }}
      />
      <Main
        lang={globalLang}
        data={{
          userID: userID,
          token: token
        }}
        current={currentSelect}
        state={{
          navList: navList
        }}
        handle={{
          toggleMessageBox: toggleMessageBox,
          toggleKick: () => setKick(true)
        }}
      />
      <MessageBox
        open={messageBoxInfo.open}
        handleClose={closeMessageBox}
        messageBoxType={messageBoxInfo.type}
        messageBoxMessage={messageBoxInfo.message}
      />
      <Load open={loading} />
      <Kick lang={globalLang} open={kick} handleClose={() => setKick(false)}/>
    </Root>
  );
}
