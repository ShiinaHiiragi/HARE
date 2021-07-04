import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import NavTitle from "../Component/NavTitle";
import Fold from "../Component/Fold";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  appBar: {
    userSelect: "none",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const {lang, state, handle} = props;

  const AppBarContent = (
    <Toolbar>
      <Fold
        navList={state.navList}
        handleToggleNavList={handle.toggleNavList}
        handleCloseNavList={handle.closeNavList}
        handleToggleNavListMobile={handle.toggleNavListMobile}
      />
      <NavTitle />
    </Toolbar>
  );

  return (
    <div>
      <Hidden xsDown implementation="css">
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: state.navList
          })}
        >
          {AppBarContent}
        </AppBar>
      </Hidden>
      <Hidden smUp implementation="css">
        <AppBar position="fixed" className={classes.appBar}>
          {AppBarContent}
        </AppBar>
      </Hidden>
    </div>
  );
}