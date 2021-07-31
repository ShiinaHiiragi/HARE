import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cookie from "react-cookies";
import Root from "../Interface/Root";
import NavBar from "../Unit/NavBar";
import NavList from "../Unit/NavList";
import Main from "../Unit/Main";
import { languagePicker } from "../Language/Lang";
import MessageBox from "../Dialogue/MessageBox";
import Kick from "../Dialogue/Kick";
import { packedGET, packedPOST } from "../Interface/Request";
import {
  cookieTime,
  defaultProfile,
  routeIndex,
  setStateDelay,
  stringFormat
} from "../Interface/Constant";

export default function Panel(props) {
  const { userID, token } = props;

  // the state of language
  const [globalLang, setGlobalLang] = React.useState(languagePicker("en"));
  React.useEffect(() => {
    let storageLang = cookie.load("lang");
    changeGlobalLang(storageLang || "en");
  }, []);
  const changeGlobalLang = (targetValue) => {
    if (targetValue)
      setTimeout(() => setGlobalLang(languagePicker(targetValue)), setStateDelay * 0.5);
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
  React.useEffect(() => {
    packedGET({
      uri: "/data/unit",
      query: { userID: userID },
      msgbox: toggleMessageBox,
      kick: () => setKick(true),
      lang: globalLang
    }).then((res) => setListObject(res));
  }, []);

  // change navList when change screen size
  const matches = useMediaQuery("(min-width:960px)");
  React.useEffect(() => {
    if (matches) {
      setNavListPC(true);
      setNavListMobile(false);
    } else setNavListPC(true);
  }, [matches]);

  // the sharing state of pages
  const [listObject, setListObject] = React.useState([]);
  const [statInfo, setStatInfo] = React.useState([]);
  const [itemList, setItemList] = React.useState([]);
  const [pageDetail, setPageDetail] = React.useState({
    pageCreateTime: "2019-12-31T16:00:00.000Z",
    itemSize: 0,
    trackSize: 0,
    timeThis: null
  });
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
      setCurrentSelect((currentSelect) => ({
        unitID: selectedUnit.unitID,
        unitName: selectedUnit.unitName,
        pageID: selectedPage.pageID,
        pageName: selectedPage.pageName,
        pageCover: selectedPage.pageCover,
        pagePresent: selectedPage.pagePresent,
        route: (selectedUnit.unitID === currentSelect.unitID
          && selectedPage.pageID === currentSelect.pageID)
          ? currentSelect.route
          : selectedPage.route
      }));
    } else setCurrentSelect({ pageName: "HARE", pagePresent: "", route: routeIndex.intro });
  }, [listObject]);

  // maintain the state of recall
  const [recall, setRecall] = React.useState({ pure: [], far: [], lost: [] });
  const submitRecall = (unitID, pageID, disableMessage) => {
    if (!recall.pure.length && !recall.far.length) return;
    packedPOST({
      uri: "/set/recall",
      query: {
        userID: userID,
        unitID: unitID,
        pageID: pageID,
        pure: recall.pure,
        far: recall.far,
        lost: !!recall.lost.length
      },
      msgbox: toggleMessageBox,
      kick: () => setKick(true),
      lang: globalLang
    }).then(() => {
      const lastIndex = pageDetail.trackSize;
      setItemList((itemList) => {
        recall.pure.forEach((id) => itemList[id - 1][lastIndex] = "P");
        recall.far.forEach((id) => itemList[id - 1][lastIndex] = "F");
        return itemList.map((_) => _);
      })
      if (disableMessage) {
        let counter = 0;
        itemList.forEach((item) => counter += Number(item[lastIndex] === "P"));
        setPageDetail((pageDetail) => ({ ...pageDetail, timeThis: null }));
        toggleMessageBox(
          stringFormat(
            globalLang.message.completeRecall,
            [(counter / pageDetail.itemSize * 100).toFixed(2)]
          ),
          "success"
        );
      }
      else {
        toggleMessageBox(globalLang.message.saveRecall, "info");
      }
    })
  }

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
          currentSelect: currentSelect,
          route: currentSelect.route,
          navListMobile: navListMobile,
          listObject: listObject
        }}
        handle={{
          toggleMessageBox: toggleMessageBox,
          toggleKick: () => setKick(true),
          closeNavListMobile: () => setNavListMobile(false),
          changeGlobalLang: changeGlobalLang,
          submitRecall: submitRecall,
          setListObject: setListObject,
          setStatInfo: setStatInfo,
          setProfile: setProfile
        }}
      />
      <Main
        lang={globalLang}
        data={{
          userID: userID,
          token: token
        }}
        state={{
          current: currentSelect,
          navList: navListPC,
          recall: recall,
          itemList: itemList,
          statInfo: statInfo,
          pageDetail: pageDetail
        }}
        handle={{
          toggleMessageBox: toggleMessageBox,
          toggleKick: () => setKick(true),
          setCurrentRoute: setCurrentRoute,
          submitRecall: submitRecall,
          setItemList: setItemList,
          setRecall: setRecall,
          setStatInfo: setStatInfo,
          setPageDetail: setPageDetail
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
