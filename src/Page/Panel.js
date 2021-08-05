import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cookie from "react-cookies";
import Root from "../Interface/Root";
import NavBar from "../Unit/NavBar";
import NavList from "../Unit/NavList";
import Main from "../Unit/Main";
import MessageBox from "../Dialogue/MessageBox";
import Load from "../Dialogue/Load";
import Kick from "../Dialogue/Kick";
import { languagePicker, nameMap } from "../Language/Lang";
import { packedGET, packedPOST } from "../Interface/Request";
import {
  cookieTime,
  defaultProfile,
  defaultPageDetail,
  defaultCurrentSelect,
  setStateDelay,
  stringFormat,
  getRank
} from "../Interface/Constant";

const PanelContext = React.createContext({});
export default function Panel(props) {
  const { userID, session } = props;

  // the state of language
  const [globalLang, setGlobalLang] = React.useState(languagePicker(nameMap.English));
  React.useEffect(() => {
    let storageLang = cookie.load("lang");
    changeGlobalLang(storageLang || nameMap.English);
  }, []);
  const changeGlobalLang = (targetValue) => {
    if (targetValue)
      setTimeout(() => setGlobalLang(languagePicker(targetValue)), setStateDelay * 0.5);
    cookie.save("lang", targetValue, { expires: cookieTime(3650) });
  };

  // the setting of request
  const [kick, setKick] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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
  const packedRequest = React.useCallback((uri, query, unauthorized) => {
    let clockLoading = null;
    cookie.save("session", session);
    const split = uri.charAt(0).toLowerCase() === "g" ? 3 : 4;
    const toggleLoading = () => {
      clockLoading = setTimeout(() => {
        clockLoading = null;
        setLoading(true);
      }, 1000);
    }
    const closeLoading = () => {
      if (clockLoading) clearTimeout(clockLoading);
      setLoading(false);
    };
    const params = {
      uri: uri.slice(split),
      query: { ...query },
      msgbox: toggleMessageBox,
      kick: () => setKick(true),
      lang: globalLang,
      unauthorized: unauthorized,
      toggleLoading: toggleLoading,
      closeLoading: closeLoading
    };
    return split === 3 ? packedGET(params) : packedPOST(params);
  }, [globalLang, userID]);

  // the sharing state of profile
  const [profile, setProfile] = React.useState(defaultProfile);
  React.useEffect(() => {
    packedRequest("GET/data/profile")
      .then((res) =>
        setProfile({
          userName: res.username,
          email: res.email,
          gender: res.gender,
          birth: res.birth,
          city: res.city || "",
          tel: res.tel || ""
        })
      );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // the state of responsive navigation list and bar
  const [navListPC, setNavListPC] = React.useState(true);
  const [navListMobile, setNavListMobile] = React.useState(false);
  React.useEffect(() => {
    packedRequest("GET/data/unit")
      .then((res) => setListObject(res));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // the sharing state of pages
  const [listObject, setListObject] = React.useState([]);
  const [itemList, setItemList] = React.useState([]);
  const [statInfo, setStatInfo] = React.useState([]);
  const [pageDetail, setPageDetail] = React.useState(defaultPageDetail);
  const [currentSelect, setCurrentSelect] = React.useState(defaultCurrentSelect);

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
    } else setCurrentSelect(defaultCurrentSelect);
  }, [listObject]);

  // the state of recall and recollection
  const [recollect, setRecollect] = React.useState(false);
  const [recall, setRecall] = React.useState({ pure: [], far: [], lost: [] });
  const submitRecall = (unitID, pageID, disableMessage) => {
    if (recollect && !recall.lost.length) {
      const pureLength = recall.pure.length, farLength = recall.far.length;
      const accuracy = pureLength / (pureLength + farLength) * 100;
      toggleMessageBox(
        stringFormat(
          globalLang.message.completeRecollect,
          [accuracy.toFixed(2), getRank(accuracy)]
        ),
        "info"
      );
    }
    if (recollect || !(recall.pure.length || recall.far.length)) return;
    packedRequest("POST/set/recall", {
      unitID: unitID,
      pageID: pageID,
      pure: recall.pure,
      far: recall.far
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
      } else toggleMessageBox(globalLang.message.saveRecall, "info");
    })
  }

  // change navList when change screen size
  const matches = useMediaQuery("(min-width:960px)");
  React.useEffect(() => {
    if (matches) {
      setNavListPC(true);
      setNavListMobile(false);
    } else setNavListPC(true);
  }, [matches]);

  return (
    <PanelContext.Provider value={{ lang: globalLang, request: packedRequest }}>
      <Root>
        <CssBaseline />
        <NavBar
          state={{
            navList: navListPC,
            currentSelect: currentSelect
          }}
          handle={{
            toggleNavList: () => setNavListPC(true),
            closeNavList: () => setNavListPC(false),
            toggleNavListMobile: () => setNavListMobile(true),
            setListObject: setListObject
          }}
        />
        <NavList
          lang={globalLang}
          state={{
            userID: userID,
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
          state={{
            current: currentSelect,
            navList: navListPC,
            recall: recall,
            recollect: recollect,
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
            setRecollect: setRecollect,
            setPageDetail: setPageDetail
          }}
        />
        <MessageBox
          open={messageBoxInfo.open}
          handleClose={closeMessageBox}
          messageBoxType={messageBoxInfo.type}
          messageBoxMessage={messageBoxInfo.message}
        />
        <Load open={loading} />
        <Kick open={kick} handleClose={() => setKick(false)} />
      </Root>
    </PanelContext.Provider>
  );
}

export { PanelContext };