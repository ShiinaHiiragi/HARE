import React from "react";
import clsx from "clsx";
import Header from "../Interface/Header";
import { drawerWidth } from "../Interface/Constant";
import MainPage from "../Interface/MainPage";
import Intro from "../Component/Intro";
import Cover from "../Component/Cover";
import View from "../Component/View";
import Statistics from "../Component/Statistics";
import Recall from "../Component/Recall";
import packedGET from "../Interface/Request";
import { routeIndex } from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  content: {
    userSelect: "none",
    height: "100vh",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

// TODO: add gallery
export default function Main(props) {
  const classes = useStyles();
  const { lang, data, state, handle } = props;

  const [timerInitial, setTimerInitial] = React.useState([0, 0]);
  React.useEffect(() => {
    if (state.current.unitID && state.current.pageID)
      packedGET({
        uri: "/data/page",
        query: {
          userID: data.userID,
          unitID: state.current.unitID,
          pageID: state.current.pageID
        },
        msgbox: handle.toggleMessageBox,
        kick: handle.toggleKick,
        lang: lang
      }).then((out) => {
        handle.setPageDetail({
          itemSize: out.itemsize,
          trackSize: out.tracksize,
          pageCreateTime: out.pagecreatetime,
          timeThis: out.timethis && true
        });
      });
  }, [state.current.unitID, state.current.pageID]);

  React.useEffect(() => {
    if (state.current.unitID && state.current.pageID)
      packedGET({
        uri: "/data/item",
        query: {
          userID: data.userID,
          unitID: state.current.unitID,
          pageID: state.current.pageID
        },
        msgbox: handle.toggleMessageBox,
        kick: handle.toggleKick,
        lang: lang
      }).then((out) => handle.setItemList(out));
  }, [state.current.unitID, state.current.pageID]);

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: state.navList
      })}
    >
      <Header />
      <MainPage index={routeIndex.intro} route={state.current.route}>
        <Intro lang={lang} />
      </MainPage>
      <MainPage index={routeIndex.cover} route={state.current.route}>
        <Cover
          lang={lang}
          data={{
            userID: data.userID,
            token: data.token,
            current: state.current,
            pageDetail: state.pageDetail,
          }}
          handle={{
            setCurrentRoute: handle.setCurrentRoute,
            toggleMessageBox: handle.toggleMessageBox,
            toggleKick: handle.toggleKick,
            setRecall: handle.setRecall,
            setRecollect: handle.setRecollect,
            setTimerInitial: setTimerInitial,
            setItemList: handle.setItemList,
            setPageDetail: handle.setPageDetail,
            setStatInfo: handle.setStatInfo,
            toggleLoading: handle.toggleLoading,
            closeLoading: handle.closeLoading
          }}
        />
      </MainPage>
      <MainPage index={routeIndex.view} route={state.current.route}>
        <View
          lang={lang}
          current={state.current}
          data={{
            userID: data.userID,
            token: data.token,
            pageDetail: state.pageDetail,
            itemList: state.itemList
          }}
          handle={{
            toggleMessageBox: handle.toggleMessageBox,
            toggleKick: handle.toggleKick,
            setRecall: handle.setRecall,
            setTimerInitial: setTimerInitial,
            setRecollect: handle.setRecollect,
            setCurrentRoute: handle.setCurrentRoute,
            setPageDetail: handle.setPageDetail,
            setItemList: handle.setItemList
          }}
        />
      </MainPage>
      <MainPage index={routeIndex.stat} route={state.current.route}>
        <Statistics
          lang={lang}
          data={{
            statInfo: state.statInfo,
            itemList: state.itemList,
            pageDetail: state.pageDetail,
            current: state.current
          }}
          handle={{
            setCurrentRoute: handle.setCurrentRoute,
            setRecollect: handle.setRecollect,
            setTimerInitial: setTimerInitial,
            setRecall: handle.setRecall
          }}
        />
      </MainPage>
      <MainPage index={routeIndex.recall} route={state.current.route}>
        <Recall
          lang={lang}
          data={{
            recall: state.recall,
            itemList: state.itemList,
            route: state.current.route,
            unitID: state.current.unitID,
            pageID: state.current.pageID,
            recollect: state.recollect,
            timerInitial: timerInitial
          }}
          handle={{
            setCurrentRoute: handle.setCurrentRoute,
            setRecall: handle.setRecall,
            submitRecall: handle.submitRecall
          }}
        />
      </MainPage>
    </main>
  );
}
