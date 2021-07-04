import Drawer from "@material-ui/core/Drawer";

import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  drawer: {
    userSelect: "none",
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {width: drawerWidth}
}));

export default function NavList(props) {
  const classes = useStyles();
  const {state} = props;

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={state.navList}
      classes={{ paper: classes.drawerPaper }}
    >
    </Drawer>
  );
}