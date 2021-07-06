import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LanguageSelector from "./LanguageSelector";

export default function GlobalMenu(props) {
  const { lang, anchor, handleClose, changeGlobalLang } = props;
  const [languageSelector, setLanguageSelector] = React.useState(false);

  return (
    <Menu
      keepMounted
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>{lang.menu.editProfile}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.changeAvatar}</MenuItem>
      <MenuItem
        onClick={() => {
          handleClose();
          setLanguageSelector(true);
        }}
      >
        {lang.menu.changeLanguage}
      </MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.viewCopyright}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.logout}</MenuItem>
      <LanguageSelector
        lang={lang} open={languageSelector}
        handleClose={(targetValue) => {
          setLanguageSelector(false);
          changeGlobalLang(targetValue);
        }}
      />
    </Menu>
  );
}