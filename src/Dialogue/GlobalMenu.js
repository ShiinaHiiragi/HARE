import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LanguageSelector from "./LanguageSelector";
import License from "./License";
import LogoutConfirm from "../Dialogue/LogoutConfirm";
import { packedPOST } from "../Interface/Request";
import { imageMaxBase } from "../Interface/Constant";

export default function GlobalMenu(props) {
  const { lang, anchor, data, handle } = props;
  const [languageSelector, setLanguageSelector] = React.useState(false);
  const [license, setLicense] = React.useState(false);
  const [logout, setLogout] = React.useState(false);

  const uploadAvatar = (event) => {
    const targetImage = event.target.files;
    if (targetImage && targetImage.length > 0) {
      if (/image\/.+/.test(targetImage[0].type)) {
        let reader = new FileReader();
        reader.readAsDataURL(targetImage[0]);
        reader.onload = (event) => 
          avatarOnload(event.target.result, targetImage[0].type)
      } else handle.toggleMessageBox(lang.message.nonImage, "warning");
    }
  };
  const avatarOnload = (result, type) => {
    if (result.length > imageMaxBase) {
      handle.toggleMessageBox(lang.message.largeImage, "warning");
    } else {
      packedPOST({
        uri: "/set/avatar",
        query: {
          userID: data.userID,
          avatar: result,
          type: type.replace(/image\/(\w+)/, ".$1")
        },
        msgbox: handle.toggleMessageBox,
        kick: handle.toggleKick,
        lang: lang
      })
        .then(() => {
          handle.refreshAvatar();
          handle.toggleMessageBox(lang.message.changeAvatar, "success");
        });
    }
  };

  return (
    <Menu
      keepMounted
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={handle.close}
    >
      <MenuItem
        onClick={() => {
          handle.close();
          handle.initValue();
          handle.clearCheck();
          handle.toggleEditProfile();
        }}
      >
        {lang.menu.editProfile}
      </MenuItem>
      <MenuItem component="label" onClick={handle.close}>
        {lang.menu.changeAvatar}
        <input type="file" accept="image/*" onChange={uploadAvatar} hidden />
      </MenuItem>
      <MenuItem
        onClick={() => {
          handle.close();
          setLanguageSelector(true);
        }}
      >
        {lang.menu.changeLanguage}
      </MenuItem>
      <MenuItem onClick={() => {
        handle.close();
        setLicense(true);
      }}>
        {lang.menu.viewCopyright}
      </MenuItem>
      <MenuItem onClick={() => {
        handle.close();
        setLogout(true);
      }}>
        {lang.menu.logout}
      </MenuItem>
      <LanguageSelector
        lang={lang} open={languageSelector}
        handleClose={(targetValue) => {
          setLanguageSelector(false);
          handle.changeGlobalLang(targetValue);
        }}
      />
      <License
        lang={lang} open={license}
        handleClose={() => setLicense(false)}
      />
      <LogoutConfirm
        lang={lang} open={logout}
        userID={data.userID} token={data.token}
        handleClose={() => setLogout(false)}
      />
    </Menu>
  );
}