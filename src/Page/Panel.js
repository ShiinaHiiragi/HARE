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

export default function Panel(props) {
  const { userID, token } = props;

  // detect if the language information is stored
  let storageLang = cookie.load("lang");
  if (storageLang === undefined) {
    storageLang = "en";
    cookie.save("lang", "en", {
      expires: new Date(new Date().getTime() + 10 * 365 * 24 * 3600 * 1000)
    });
  }
  const [globalLang, setGlobalLang] = React.useState(languagePicker(storageLang));
  const changeGlobalLang = (targetValue) => {
    if (targetValue) setGlobalLang(languagePicker(targetValue));
    cookie.save("lang", targetValue, {
      expires: new Date(new Date().getTime() + 10 * 365 * 24 * 3600 * 1000)
    });
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
  const [profile, setProfile] = React.useState({
    userName: "", email: "",
    gender: "U", birth: "2019-12-31T16:00:00.000Z", city: "", tel: ""
  });
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
        gender: res.gender, birth: res.birth, city: res.city, tel: res.tel
      }));
  }, []);

  // the sharing state of selected page
  const [currentSelect, setCurrentSelect] = React.useState({
    unitID: 0, pageID: 0, pageName: "HARE", pagePresent: ""
  });
  React.useEffect(() => {
    let selectedUnit = listObject.find((item) => item.selected), selectedPage;
    if (selectedUnit) selectedPage = selectedUnit.pages.find((item) => item.selected);
    if (selectedPage)
      setCurrentSelect({
        unitID: selectedUnit.unitID,
        pageID: selectedPage.pageID,
        pageName: selectedPage.pageName,
        pagePresent: selectedPage.pagePresent
      });
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
        lang={globalLang}
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
      <Main lang={globalLang} state={{ navList: navList }} />
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
