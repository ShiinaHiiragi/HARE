import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import cookie from "react-cookies";
import Root from "../Interface/Root";
import NavBar from "../Unit/NavBar";
import NavList from "../Unit/NavList";
import Main from "../Unit/Main";
import { languagePicker } from "../Language/Lang";
import MessageBox from "../Dialogue/MessageBox";
import Kick from "../Dialogue/Kick";
import packedGET from "../Interface/Request";
import { cookieTime, defaultProfile, routeIndex } from "../Interface/Constant";

export default function Panel(props) {
  const { userID, token } = props;

  // the state of language
  const [globalLang, setGlobalLang] = React.useState(languagePicker("en"));
  React.useEffect(() => {
    let storageLang = cookie.load("lang");
    changeGlobalLang(storageLang || "en");
  }, []);
  const changeGlobalLang = (targetValue) => {
    if (targetValue) setGlobalLang(languagePicker(targetValue));
    cookie.save("lang", targetValue, { expires: cookieTime(3650) });
  };

  // the sharing state of profile
  const [profile, setProfile] = React.useState(defaultProfile);
  React.useEffect(() => {
    packedGET({
      uri: "/data/profile",
      query: { userID: userID },
      msgbox: toggleMessageBox,
      kick: () => setKick(true),
      lang: globalLang
    }).then((res) =>
      setProfile({
        userName: res.username,
        email: res.email,
        gender: res.gender,
        birth: res.birth,
        city: res.city || "",
        tel: res.tel || ""
      })
    );
  }, []);

  // the sharing state of response navigation bar and list
  const [navListPC, setNavListPC] = React.useState(true);
  const [navListMobile, setNavListMobile] = React.useState(false);
  const [listObject, setListObject] = React.useState([]);
  React.useEffect(() => {
    packedGET({
      uri: "/data/unit",
      query: { userID: userID },
      msgbox: toggleMessageBox,
      kick: () => setKick(true),
      lang: globalLang
    }).then((res) => setListObject(res));
  }, []);

  // the sharing state of selected page
  const [currentSelect, setCurrentSelect] = React.useState({
    pageName: "HARE",
    pagePresent: "",
    route: routeIndex.intro
  });
  // ATTENTION: we don't need pass setCurrentSelect to child node because of
  // the effect hook; but we need to pass setRoute because the change on route
  // don't update listObject immediately
  const setCurrentRoute = (target) =>
    setCurrentSelect((currentSelect) => ({
      ...currentSelect,
      route: target
    }));
  React.useEffect(() => {
    let selectedUnit = listObject.find((item) => item.selected),
      selectedPage;
    if (selectedUnit)
      selectedPage = selectedUnit.pages.find((item) => item.selected);
    if (selectedPage) {
      console.log(selectedPage);
      setCurrentSelect({
        unitID: selectedUnit.unitID,
        unitName: selectedUnit.unitName,
        pageID: selectedPage.pageID,
        pageName: selectedPage.pageName,
        pageCover: selectedPage.pageCover,
        pagePresent: selectedPage.pagePresent,
        route: selectedPage.route
      });
    } else setCurrentSelect({ pageName: "HARE", pagePresent: "", route: routeIndex.intro });
  }, [listObject]);

  // the setting of disconnection message box
  const [kick, setKick] = React.useState(false);
  const [messageBoxInfo, setMessageBoxInfo] = React.useState({
    open: false,
    type: "success",
    message: ""
  });
  const toggleMessageBox = (message, type) => {
    setMessageBoxInfo({ open: true, type: type, message: message });
  };
  const closeMessageBox = () => {
    setMessageBoxInfo((messageBoxInfo) => ({
      ...messageBoxInfo,
      open: false
    }));
  };

  // maintain the state of recall
  const [recall, setRecall] = React.useState({
    pure: [], far: [], lost: []
  });

  return (
    <Root>
      <CssBaseline />
      <NavBar
        lang={globalLang}
        state={{
          userID: userID,
          navList: navListPC,
          currentSelect: currentSelect
        }}
        handle={{
          toggleNavList: () => setNavListPC(true),
          closeNavList: () => setNavListPC(false),
          toggleNavListMobile: () => setNavListMobile(true),
          toggleMessageBox: toggleMessageBox,
          toggleKick: () => setKick(true),
          setListObject: setListObject
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
          navList: navListPC,
          route: currentSelect.route,
          navListMobile: navListMobile,
          listObject: listObject
        }}
        handle={{
          toggleMessageBox: toggleMessageBox,
          toggleKick: () => setKick(true),
          closeNavListMobile: () => setNavListMobile(false),
          changeGlobalLang: changeGlobalLang,
          setListObject: setListObject,
          setProfile: setProfile
        }}
      />
      <Main
        lang={globalLang}
        data={{
          userID: userID,
          token: token
        }}
        current={currentSelect}
        navList={navListPC}
        state={{
          current: currentSelect,
          navList: navListPC,
          recall: recall
        }}
        handle={{
          toggleMessageBox: toggleMessageBox,
          toggleKick: () => setKick(true),
          setCurrentRoute: setCurrentRoute,
          setRecall: setRecall
        }}
      />
      <MessageBox
        open={messageBoxInfo.open}
        handleClose={closeMessageBox}
        messageBoxType={messageBoxInfo.type}
        messageBoxMessage={messageBoxInfo.message}
      />
      <Kick lang={globalLang} open={kick} handleClose={() => setKick(false)} />
    </Root>
  );
}
