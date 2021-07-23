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
  const { lang, data, state, handle } = props;
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
    `${requestURL}/src/avatar?userID=${data.userID}`
  );
  const refreshAvatar = () =>
    setAvatarURL(
      `${requestURL}/src/avatar?userID=${data.userID}&t=${randomTimestamp()}`
    );

  const drawerContent = (
    <div className={classes.sideList}>
      <PersonalInfo
        lang={lang}
        data={{
          userID: data.userID,
          token: data.token,
          avatar: avatarURL,
          profile: state.profile
        }}
        handle={{
          toggleMessageBox: handle.toggleMessageBox,
          toggleKick: handle.toggleKick,
          toggleEditProfile: () => setEditProfile(true),
          changeGlobalLang: handle.changeGlobalLang,
          refreshAvatar: refreshAvatar,
          initValue: initValue,
          clearCheck: clearCheck
        }}
      />
      <Divider />
      <Pages
        lang={lang}
        userID={data.userID}
        token={data.token}
        listObject={state.listObject}
        setListObject={handle.setListObject}
        route={state.route}
        navListMobile={state.navListMobile}
        handle={{
          toggleMessageBox: handle.toggleMessageBox,
          closeNavListMobile: handle.closeNavListMobile,
          toggleKick: handle.toggleKick,
          setCurrentSelect: handle.setCurrentSelect
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
        lang={lang}
        open={editProfile}
        data={{
          userID: data.userID,
          token: data.token,
          avatar: avatarURL
        }}
        value={value}
        check={check}
        handle={{
          setProfile: handle.setProfile,
          setValue: setValue,
          setCheck: setCheck,
          toggleMessageBox: handle.toggleMessageBox,
          toggleKick: handle.toggleKick,
          close: () => setEditProfile(false)
        }}
      />
    </div>
  );
}
