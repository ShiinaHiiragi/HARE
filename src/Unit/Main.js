import clsx from "clsx";
import Header from "../Interface/Header";
import Box from '@material-ui/core/Box';

import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  content: {
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
  const {state} = props;

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: state.navList
      })}
    >
    <Header />

    {/* TODO: Router: control to skip one page of following: */}
    <Box component="div" display={"none"}>
      Intro
    </Box>
    <Box component="div" display={"none"}>
      Cover
    </Box>
    <Box component="div" display={"none"}>
      Recall
    </Box>
    <Box component="div" display={"none"}>
      Listing
    </Box>
    <Box component="div" display={"none"}>
      Statistics
    </Box>
    <Box component="div" display={"none"}>
      Ranking
    </Box>
    </main>
  );
}