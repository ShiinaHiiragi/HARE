import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import PersonalInfo from "../Component/PersonalInfo";
import Divider from "@material-ui/core/Divider";
import Pages from "../Component/Pages";
import Profile from "../Dialogue/Profile";
import requestURL from "../Interface/Constant";
import {
  drawerWidth,
  randomTimestamp,
  defaultProfile
} from "../Interface/Constant";

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
  const { state, handle } = props;
  const [editProfile, setEditProfile] = React.useState(false);

  const [value, setValue] = React.useState(defaultProfile);
  const initValue = () => setValue({ ...state.profile });
  const [check, setCheck] = React.useState({
    userName: false,
    city: false,
    tel: false
  });
  const clearCheck = () => {
    setCheck({ userName: false, city: false, tel: false });
  };

  const [avatarURL, setAvatarURL] = React.useState(
    `${requestURL}/src/avatar?userID=${state.userID}`
  );
  const refreshAvatar = () =>
    setAvatarURL(
      `${requestURL}/src/avatar?userID=${state.userID}&t=${randomTimestamp()}`
    );

  const drawerContent = (
    <div className={classes.sideList}>
      <PersonalInfo
        state={{
          userID: state.userID,
          avatar: avatarURL,
          profile: state.profile,
          listObject: state.listObject,
          lowRank: state.lowRank,
          hideMove: state.hideMove,
          lineTag: state.lineTag,
          languageName: state.languageName,
          log: state.log
        }}
        handle={{
          toggleMessageBox: handle.toggleMessageBox,
          toggleEditProfile: () => setEditProfile(true),
          changeGlobalLang: handle.changeGlobalLang,
          refreshAvatar: refreshAvatar,
          initValue: initValue,
          setLowRank: handle.setLowRank,
          setHideMove: handle.setHideMove,
          setLineTag: handle.setLineTag,
          clearCheck: clearCheck
        }}
      />
      <Divider />
      <Pages
        state={{
          route: state.route,
          range: state.range,
          listObject: state.listObject,
          navListMobile: state.navListMobile,
          currentSelect: state.currentSelect
        }}
        handle={{
          setImage: handle.setImage,
          toggleMessageBox: handle.toggleMessageBox,
          submitRecall: handle.submitRecall,
          closeNavListMobile: handle.closeNavListMobile,
          toggleKick: handle.toggleKick,
          setStatInfo: handle.setStatInfo,
          setListObject: handle.setListObject
        }}
      />
    </div>
  );

  return (
    <div>
      <Hidden smDown implementation="css">
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
      <Hidden mdUp implementation="css">
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
      <Profile
        open={editProfile}
        state={{
          userID: state.userID,
          avatar: avatarURL,
          value: value,
          check: check
        }}
        handle={{
          setValue: setValue,
          setCheck: setCheck,
          setProfile: handle.setProfile,
          toggleMessageBox: handle.toggleMessageBox,
          close: () => setEditProfile(false)
        }}
      />
    </div>
  );
}
