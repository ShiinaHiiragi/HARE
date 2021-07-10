import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import PersonalInfo from "../Component/PersonalInfo";
import Divider from "@material-ui/core/Divider";
import Pages from "../Component/Pages";
import Profile from "../Dialogue/Profile"
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
  const [avatarURL, setAvatarURL] = React.useState(
    `${requestURL}/src/avatar?userID=${data.userID}&token=${data.token}`
  );
  const refreshAvatar = () => setAvatarURL(
    `${requestURL}/src/avatar?userID=${data.userID}&token=${data.token}&t=${randomTimestamp()}`
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
          setValue: setValue
        }}
      />
      <Divider />
      <Pages
        lang={lang}
        userID={data.userID}
        token={data.token}
        listObject={state.listObject}
        setListObject={handle.setListObject}
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
      <Profile
        lang={lang}
        open={editProfile}
        data={{
          userID: data.userID,
          token: data.token,
          avatar: avatarURL
        }}
        value={value}
        check={{
          userName: false, birth: false,
          city: false, tel: false
        }}
        handle={{
          setProfile: handle.setProfile,
          setValue: setValue,
          close: () => setEditProfile(false)
        }}
      />
    </div>
  );
}
