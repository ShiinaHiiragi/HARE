import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LanguageSelector from "./LanguageSelector";
import License from "./License";
import LogoutConfirm from "../Dialogue/LogoutConfirm";
import { packedPOST } from "../Interface/Request";

export default function GlobalMenu(props) {
  const { lang, anchor, data, handle } = props;
  const [languageSelector, setLanguageSelector] = React.useState(false);
  const [license, setLicense] = React.useState(false);
  const [logout, setLogout] = React.useState(false);

  const uploadAvatar = (event) => {
    const targetImage = event.target.files;
    if (targetImage) {
      if (/image\/.+/.test(targetImage[0].type)) {
        let data = new FormData();
        data.append("file", targetImage[0]);
        data.append("chunk", 0);
        packedPOST({
          uri: "/set/avatar",
          query: data,
          msgbox: handle.toggleMessageBox,
          kick: handle.toggleKick,
          lang: lang
        }, { headers: { "Content-Type": "multipart/form-data" } })
          .then((out) => console.log(data));
      } else {
        console.log("×");
      }
    }
  }

  return (
    <Menu
      keepMounted
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={handle.close}
    >
      <MenuItem onClick={handle.close}>{lang.menu.editProfile}</MenuItem>
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