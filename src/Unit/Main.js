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
import Gallery from "../Component/Gallery";
import { routeIndex } from "../Interface/Constant";
import { PanelContext } from "../Page/Panel";

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

export default function Main(props) {
  const classes = useStyles();
  const { state, handle } = props;
  const context = React.useContext(PanelContext);

  const [timerInitial, setTimerInitial] = React.useState([0, 0]);
  React.useEffect(() => {
    if (state.current.unitID && state.current.pageID)
      context.request("GET/data/page", {
        unitID: state.current.unitID,
        pageID: state.current.pageID
      }).then((out) => {
        handle.setPageDetail({
          itemSize: out.itemsize,
          trackSize: out.tracksize,
          pageCreateTime: out.pagecreatetime,
          timeThis: out.timethis && true
        });
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.current.unitID, state.current.pageID]);

  React.useEffect(() => {
    if (state.current.unitID && state.current.pageID)
      context.request("GET/data/item", {
        unitID: state.current.unitID,
        pageID: state.current.pageID
      }).then((out) => handle.setItemList(out));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.current.unitID, state.current.pageID]);

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: state.navList
      })}
    >
      <Header />
      <MainPage index={routeIndex.intro} route={state.current.route}>
        <Intro lang={context.lang} />
      </MainPage>
      <MainPage index={routeIndex.cover} route={state.current.route}>
        <Cover
          state={{
            current: state.current,
            pageDetail: state.pageDetail,
          }}
          handle={{
            setImage: handle.setImage,
            setCurrentRoute: handle.setCurrentRoute,
            setRecall: handle.setRecall,
            setRecollect: handle.setRecollect,
            setTimerInitial: setTimerInitial,
            setItemList: handle.setItemList,
            setPageDetail: handle.setPageDetail,
            setStatInfo: handle.setStatInfo
          }}
        />
      </MainPage>
      <MainPage index={routeIndex.view} route={state.current.route}>
        <View
          state={{
            range: state.range,
            current: state.current,
            pageDetail: state.pageDetail,
            hideMove: state.hideMove,
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
          state={{
            lowRank: state.lowRank,
            statInfo: state.statInfo,
            itemList: state.itemList,
            pageDetail: state.pageDetail,
            current: state.current
          }}
          handle={{
            setCurrentRoute: handle.setCurrentRoute,
            setRecollect: handle.setRecollect,
            setTimerInitial: setTimerInitial,
            setRecall: handle.setRecall,
            setPageDetail: handle.setPageDetail,
            setStatInfo: handle.setStatInfo,
            setItemList: handle.setItemList
          }}
        />
      </MainPage>
      <MainPage index={routeIndex.recall} route={state.current.route}>
        <Recall
          state={{
            recall: state.recall,
            itemList: state.itemList,
            prevRoute: state.current.prevRoute,
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
      <MainPage index={routeIndex.gallery} route={state.current.route}>
        <Gallery
          state={{
            unitID: state.current.unitID,
            pageID: state.current.pageID,
            image: state.image,
            range: state.range,
          }}
          handle={{
            setImage: handle.setImage,
            setCurrentRoute: handle.setCurrentRoute,
            toggleMessageBox: handle.toggleMessageBox
          }}
        />
      </MainPage>
    </main>
  );
}
