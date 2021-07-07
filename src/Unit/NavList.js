import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import PersonalInfo from "../Component/PersonalInfo";
import Divider from "@material-ui/core/Divider";
import Pages from "../Component/Pages";
import { drawerWidth } from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  drawer: {
    userSelect: "none",
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: { width: drawerWidth },
  sideList: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
}));

export default function NavList(props) {
  const classes = useStyles();
  const { lang, data, state, handle } = props;

  const drawerContent = (
    <div className={classes.sideList}>
      <PersonalInfo
        lang={lang}
        data={data}
        handle={{
          changeGlobalLang: handle.changeGlobalLang
        }}
      />
      <Divider />
      <Pages
        lang={lang}
        userID={data.userID}
        token={data.token}
        handle={{
          toggleMessageBox: handle.toggleMessageBox,
          toggleLoading: handle.toggleLoading,
          toggleKick: handle.toggleKick,
          closeLoading: handle.closeLoading
        }}
      />
    </div>
  );

  return (
    <div>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={state.navList}
          classes={{ paper: classes.drawerPaper }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden smUp implementation="css">
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={state.navListMobile}
          classes={{ paper: classes.drawerPaper }}
          onClose={handle.closeNavListMobile}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
    </div>
  );
}
