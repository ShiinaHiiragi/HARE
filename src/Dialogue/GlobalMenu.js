import React from "react";
import cookie from "react-cookies";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import License from "./License";
import LogoutConfirm from "../Dialogue/LogoutConfirm";
import Password from "./Password";
import LocalSetting from "./LocalSetting";
import { PanelContext } from "../Page/Panel";
import { maxImageBase, lineReg, cookieTime } from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  alarm: {
    color: theme.palette.secondary.main
  }
}));

export default function GlobalMenu(props) {
  const classes = useStyles();
  const { state, handle } = props;
  const context = React.useContext(PanelContext);

  const [license, setLicense] = React.useState(false);
  const [logout, setLogout] = React.useState(false);
  const [password, setPassword] = React.useState(false);
  const [localSetting, setLocalSetting] = React.useState(false);

  const [lineCode, setLineCode] = React.useState("");
  const localLineReg = React.useMemo(() => {
    const windowReg = new RegExp(`^${lineReg.source}$`);
    window.tagReg = windowReg;
    return windowReg;
  }, []);

  const uploadAvatar = (event) => {
    const targetImage = event.target.files;
    if (targetImage && targetImage.length > 0) {
      if (/image\/.+/.test(targetImage[0].type)) {
        let reader = new FileReader();
        reader.readAsDataURL(targetImage[0]);
        reader.onload = (event) =>
          avatarOnload(event.target.result, targetImage[0].type);
      } else handle.toggleMessageBox(context.lang.message.nonImage, "warning");
    }
  };
  const avatarOnload = (result, type) => {
    if (result.length > maxImageBase) {
      handle.toggleMessageBox(context.lang.message.largeImage, "warning");
    } else {
      context.request("POST/set/avatar", {
        image: result,
        type: type.replace(/image\/(\w+)/, ".$1")
      }).then(() => {
        handle.refreshAvatar();
        handle.toggleMessageBox(context.lang.message.changeAvatar, "success");
      });
    }
  };

  const closeLocalSetting = () => {
    setLocalSetting(false);
    if (localLineReg.test(lineCode)) {
      handle.setLineTag(lineCode);
      cookie.save("lineTag", lineCode, { expires: cookieTime(3650) });
    }
  }

  return (
    <Menu
      keepMounted
      anchorEl={state.anchor}
      open={Boolean(state.anchor)}
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
        {context.lang.menu.editProfile}
      </MenuItem>
      <MenuItem
        onClick={() => {
          setPassword(true);
          handle.close();
        }}
      >
        {context.lang.menu.changePassword}
      </MenuItem>
      <MenuItem component="label" onClick={handle.close}>
        {context.lang.menu.changeAvatar}
        <input type="file" accept="image/*" onChange={uploadAvatar} hidden />
      </MenuItem>
      <MenuItem
        onClick={() => {
          handle.close();
          let zip = JSZip();
          context.request("GET/data/items")
            .then((units) => {
              units.forEach((pages, unitIndex) => {
                let pagesFile = zip.folder(`${unitIndex + 1}_${state.listObject[unitIndex].unitName}`);
                pages.forEach((items, pageIndex) => {
                  pagesFile.file(
                    `${pageIndex + 1}_${state.listObject[unitIndex].pages[pageIndex].pageName}.json`,
                    JSON.stringify(items, null, 2)
                  )
                })
              })
              zip.generateAsync({ type: "blob" })
                .then((content) => saveAs(content, `${state.userName}`));
            })
        }}
      >
        {context.lang.menu.exportAll}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handle.close();
          setLineCode(state.lineTag);
          setLocalSetting(true);
        }}
      >
        {context.lang.menu.localSetting}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handle.close();
          setLicense(true);
        }}
      >
        {context.lang.menu.viewCopyright}
      </MenuItem>
      <MenuItem
        className={classes.alarm}
        onClick={() => {
          handle.close();
          setLogout(true);
        }}
      >
        {context.lang.menu.logout}
      </MenuItem>
      <Password
        open={password}
        email={state.email}
        handle={{
          close: () => setPassword(false),
          toggleMessageBox: handle.toggleMessageBox
        }}
      />
      <License
        withTab
        open={license}
        log={state.log}
        handleClose={() => setLicense(false)}
        handleToggleMessageBox={handle.toggleMessageBox}
      />
      <LogoutConfirm
        open={logout}
        userID={state.userID}
        handleClose={() => setLogout(false)}
        handleToggleMessageBox={handle.toggleMessageBox}
      />
      <LocalSetting
        open={localSetting}
        state={{
          lineCode: lineCode,
          lowRank: state.lowRank,
          hideMove: state.hideMove,
          languageName: state.languageName,
          localLineReg: localLineReg
        }}
        handle={{
          close: closeLocalSetting,
          setLineCode: setLineCode,
          setLowRank: handle.setLowRank,
          setHideMove: handle.setHideMove,
          changeGlobalLang: handle.changeGlobalLang
        }}
      />
    </Menu>
  );
}
