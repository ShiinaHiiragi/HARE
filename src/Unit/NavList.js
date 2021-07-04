import Drawer from "@material-ui/core/Drawer";

import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  drawer: {
    userSelect: "none",
    width: drawerWidth,
    flexShrink: 0
  },
}));

export default function NavList(props) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
    >
    </Drawer>
  );
}