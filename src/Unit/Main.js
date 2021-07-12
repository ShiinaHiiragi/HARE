import React from "react";
import clsx from "clsx";
import Header from "../Interface/Header";
import { drawerWidth } from "../Interface/Constant";
import MainPage from "../Interface/MainPage";
import Intro from "../Component/Intro";
import Cover from "../Component/Cover";
import View from "../Component/View";

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
  },
}));

export default function Main(props) {
  const classes = useStyles();
  const { lang, data, current, state, handle } = props;

  return (
    <main
      className={clsx(
        classes.content,
        { [classes.contentShift]: state.navList }
      )}
    >
      <Header />
      <MainPage index={0} route={current.route}>
        <Intro lang={lang} />
      </MainPage>
      <MainPage index={1} route={current.route}>
        <Cover
          lang={lang} current={current}
          data={{
            userID: data.userID,
            token: data.token
          }}
          handle={{
            toggleMessageBox: handle.toggleMessageBox,
            toggleKick: handle.toggleKick,
            setCurrentRoute: handle.setCurrentRoute
          }}
        />
      </MainPage>
      <MainPage index={2} route={current.route}>
        <View
          lang={lang} current={current}
          data={{
            userID: data.userID,
            token: data.token
          }}
          handle={{
            toggleMessageBox: handle.toggleMessageBox,
            toggleKick: handle.toggleKick,
            setCurrentRoute: handle.setCurrentRoute
          }}
        />
      </MainPage>
      <MainPage index={3} route={current.route}>
        3 - Statistics
      </MainPage>
      <MainPage index={4} route={current.route}>
        4 - Recall
      </MainPage>
      <MainPage index={5} route={current.route}>
        5 - Ranking
      </MainPage>
    </main>
  );
}
