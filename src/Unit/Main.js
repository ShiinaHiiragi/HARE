import React from "react";
import clsx from "clsx";
import Header from "../Interface/Header";
import IntroGraph from "../Interface/intro.png"
import { drawerWidth } from "../Interface/Constant";
import MainPage from "../Interface/MainPage";

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
  intro: {
    justifyContent: "center",
    backgroundColor: "red",
  }
}));

export default function Main(props) {
  const classes = useStyles();
  const { lang, state } = props;

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: state.navList
      })}
    >
      <Header />
      <MainPage index={0} route={state.route} className={classes.intro}>
        <img src={IntroGraph} />
      </MainPage>
      <MainPage index={1} route={state.route}>
        1 - Cover
      </MainPage>
      <MainPage index={2} route={state.route}>
        2 - Recall
      </MainPage>
      <MainPage index={3} route={state.route}>
        3 - Listing
      </MainPage>
      <MainPage index={4} route={state.route}>
        4 - Statistics
      </MainPage>
      <MainPage index={5} route={state.route}>
        5 - Ranking
      </MainPage>
    </main>
  );
}
