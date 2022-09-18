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
import Conflict from "../Dialogue/Conflict";
import { languagePicker, nameMap, containLanguage } from "../Language/Lang";
import { packedGET, packedPOST } from "../Interface/Request";
import {
  cookieTime,
  defaultProfile,
  defaultRange,
  defaultPageDetail,
  defaultCurrentSelect,
  stringFormat,
  getRank,
  innerVersionBit,
  versionLatest,
  disjunctVersion,
  cookieSetting,
  cookieString,
  underline,
  defaultHiddenTag,
  defaultQuerySeparator,
  defaultKeySeparator,
  checkLineReg
} from "../Interface/Constant";

const PanelContext = React.createContext({});
export default function Panel(props) {
  const { userID, session } = props;

  // the state of language
  const [languageName, setLanguageName] = React.useState(nameMap.English);
  const [globalLang, setGlobalLang] = React.useState(languagePicker());
  const changeGlobalLang = React.useCallback((targetValue) => {
    if (targetValue) {
      setGlobalLang(languagePicker(targetValue));
      setLanguageName(containLanguage(targetValue));
    }
    cookie.save("lang", targetValue, { expires: cookieTime(3650) });
  }, []);
  React.useEffect(() => {
    let storageLang = cookie.load("lang") ?? nameMap.English;
    changeGlobalLang(storageLang);
  }, [changeGlobalLang]);

  // load cookie to seek some setting
  const [lowRank, setLowRank] = React.useState(true);
  const [showMove, setShowMove] = React.useState(true);
  const [showKey, setShowKey] = React.useState(true);
  const [showCaption, setShowCaption] = React.useState(true);
  const [lineTag, setLineTag] = React.useState(underline);
  const [hiddenTag, setHiddenTag] = React.useState(defaultHiddenTag);
  const [querySeparator, setQuerySeparator] = React.useState(defaultQuerySeparator);
  const [keySeparator, setKeySeparator] = React.useState(defaultKeySeparator);
  React.useEffect(() => {
    cookieSetting("lowRank", setLowRank);
    cookieSetting("showMove", setShowMove);
    cookieSetting("showKey", setShowKey);
    cookieSetting("showCaption", setShowCaption);

    // lineTag is a little special from others
    const storageLineTag = cookie.load("lineTag");
    if (typeof(storageLineTag) !== "string" || !checkLineReg().test(storageLineTag)) {
      cookie.save("lineTag", underline, { expires: cookieTime(3650) });
    } else setLineTag(storageLineTag);

    // and also for hiddenTag and so on
    cookieString("hiddenTag", setHiddenTag, defaultHiddenTag);
    cookieString("querySeparator", setQuerySeparator, defaultQuerySeparator);
    cookieString("keySeparator", setKeySeparator, defaultKeySeparator);
  }, []);

  // the setting of request
  const [kick, setKick] = React.useState(false);
  const [conflict, setConflict] = React.useState(false);
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

  // unauthorized: function or undefined. the unauthorized will be
  // executed if unauthorized is a function and return 401 or 409
  // noLoading: if true, the loading won't be toggled if request for a long time
  const packedRequest = React.useCallback((uri, query, unauthorized, noLoading) => {
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
      conflict: () => setConflict(true),
      lang: globalLang,
      unauthorized: unauthorized,
      toggleLoading: !noLoading && toggleLoading,
      closeLoading: !noLoading && closeLoading,
    };
    return split === 3 ? packedGET(params) : packedPOST(params);
  }, [globalLang, session]);

  // the sharing state of profile
  const [range, setRange] = React.useState(defaultRange);
  const [profile, setProfile] = React.useState(defaultProfile);
  React.useEffect(() => {
    packedRequest("GET/data/profile")
      .then((res) => {
        setProfile({
          userName: res.username,
          email: res.email,
          gender: res.gender,
          birth: res.birth,
          city: res.city || "",
          tel: res.tel || ""
        });
        setRange({
          maxUnit: res.maxunit,
          maxPage: res.maxpage,
          maxItem: res.maxitem,
          maxImg: res.maximg
        });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [log, setLog] = React.useState([]);
  React.useEffect(() => {
    packedRequest("GET/src/log").then((out) => {
      const version = versionLatest(out);
      setLog(out);

      // notice of update
      // the language may not been updated when toggling msgbox
      // so we must use languagePicker()
      const storageLang = cookie.load("lang");
      const storageVersion = cookie.load("version", true);
      const thisVersion = disjunctVersion(version);
      const saveVersion = disjunctVersion(storageVersion);
      for (let index = 0; index < innerVersionBit; index += 1) {
        const versionDiff = thisVersion[index] - saveVersion[index];
        if (versionDiff) {
          if (versionDiff > 0 && /^(\d+)(\.\d+){2,3}$/.test(storageVersion)) {
            toggleMessageBox(
              languagePicker(storageLang).message.newVersion,
              "info"
            );
          }
          break;
        }
      }
      cookie.save("version", version, { expires: cookieTime(3650) });
    });
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
      prevRoute: currentSelect.route,
      route: target
    }));
  React.useEffect(() => {
    let selectedUnit = listObject.find((item) => item.selected),
      selectedPage;
    if (selectedUnit)
      selectedPage = selectedUnit.pages.find((item) => item.selected);
    if (selectedPage) {
      const samePage = (selectedUnit.unitID === currentSelect.unitID
        && selectedPage.pageID === currentSelect.pageID);
      setCurrentSelect((currentSelect) => ({
        unitID: selectedUnit.unitID,
        unitName: selectedUnit.unitName,
        pageID: selectedPage.pageID,
        pageName: selectedPage.pageName,
        pageCover: selectedPage.pageCover,
        pagePresent: selectedPage.pagePresent,
        prevRoute: samePage ? currentSelect.prevRoute : -1,
        route: samePage ? currentSelect.route : selectedPage.route
      }));
    } else setCurrentSelect(defaultCurrentSelect);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          [accuracy.toFixed(2), getRank(accuracy, lowRank)]
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
        return [...itemList];
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
  const rearrangeLost = (shuffle) => setRecall((recall) => ({
    ...recall, lost: recall.lost.sort(shuffle
      ? () =>  0.5 - Math.random()
      : (left, right) => left - right
    )
  }))

  // the state of image
  const [image, setImage] = React.useState([]);

  // change navList when change screen size
  const matches = useMediaQuery("(min-width:960px)");
  React.useEffect(() => {
    if (matches) {
      setNavListPC(true);
      setNavListMobile(false);
    } else setNavListPC(true);
  }, [matches]);

  return (
    <PanelContext.Provider value={{
      lang: globalLang,
      request: packedRequest,
      range: range
    }}>
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
            range: range,
            navList: navListPC,
            currentSelect: currentSelect,
            route: currentSelect.route,
            navListMobile: navListMobile,
            listObject: listObject,
            lowRank: lowRank,
            showMove: showMove,
            showKey: showKey,
            showCaption: showCaption,
            lineTag: lineTag,
            hiddenTag: hiddenTag,
            languageName: languageName,
            querySeparator: querySeparator,
            keySeparator: keySeparator,
            log: log
          }}
          handle={{
            setImage: setImage,
            toggleMessageBox: toggleMessageBox,
            toggleKick: () => setKick(true),
            closeNavListMobile: () => setNavListMobile(false),
            changeGlobalLang: changeGlobalLang,
            submitRecall: submitRecall,
            setListObject: setListObject,
            setStatInfo: setStatInfo,
            setLowRank: setLowRank,
            setShowMove: setShowMove,
            setShowKey: setShowKey,
            setShowCaption: setShowCaption,
            setLineTag: setLineTag,
            setHiddenTag: setHiddenTag,
            setQuerySeparator: setQuerySeparator,
            setKeySeparator: setKeySeparator,
            setProfile: setProfile
          }}
        />
        <Main
          lang={globalLang}
          state={{
            range: range,
            lineTag: lineTag,
            hiddenTag: hiddenTag,
            image: image,
            current: currentSelect,
            navList: navListPC,
            recall: recall,
            recollect: recollect,
            itemList: itemList,
            statInfo: statInfo,
            lowRank: lowRank,
            showMove: showMove,
            showKey: showKey,
            showCaption: showCaption,
            pageDetail: pageDetail
          }}
          handle={{
            toggleMessageBox: toggleMessageBox,
            toggleKick: () => setKick(true),
            setCurrentRoute: setCurrentRoute,
            submitRecall: submitRecall,
            rearrangeLost: rearrangeLost,
            setItemList: setItemList,
            setRecall: setRecall,
            setImage: setImage,
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
        <Conflict open={conflict} />
      </Root>
    </PanelContext.Provider>
  );
}

export { PanelContext };