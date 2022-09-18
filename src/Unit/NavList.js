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
  downloadQuestion,
  downloadAnswer,
  downloadSynthesis,
  imageReg,
  defaultProfile
} from "../Interface/Constant";
import { PanelContext } from "../Page/Panel";

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
  const context = React.useContext(PanelContext);

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

  const addPageMarkdown = (supFolder, unitID, pageID, images, bases, items) => new Promise((resolve) => {
    const filling = (items) => {
      let pictures = [];
      const synthesis = [false];
      supFolder.file("questions.md", items.map((item) => {
        const lineText = downloadQuestion(item);
        return replaceImage(lineText, pictures, images);
      }).join("\n\n"));
      supFolder.file("answers.md", items.map((item) => {
        const lineText = downloadAnswer(item, synthesis);
        return replaceImage(lineText, pictures, images);
      }).join("\n\n---\n\n"));
      if (synthesis[0])
        supFolder.file("synthesis.md", items.map((item) => {
          const lineText = downloadSynthesis(item);
          return replaceImage(lineText, pictures, images);
        }).join("\n\n"));
      if (pictures.length) {
        const assets = supFolder.folder("assets");
        pictures.forEach((item) => {
          const img = images[item[0] - 1][item[1] - 1][item[2] - 1];
          assets.file(
            `${item.join("_")}_${img.title}${img.type}`,
            bases[item[0] - 1][item[1] - 1][item[2] - 1],
            { base64: true }
          )
        });
      }
      resolve();
    };

    if (items !== undefined) {
      filling(items);
      return;
    }

    context.request("GET/data/item", { unitID: unitID, pageID: pageID })
      .then(filling);
  })

  const replaceImage = (text, pictures, images) =>
    text.replace(imageReg[0], (all, mark, unitID, pageID, imageID) => {
      const test = [Number(unitID), Number(pageID), Number(imageID)];
      const img = images?.[test[0] - 1]?.[test[1] - 1]?.[test[2] - 1];
      if (img !== undefined) {
        uniquePush(pictures, test);
        return `![${mark}](assets/${test.join("_")}_${img.title}${img.type})`
      } else {
        return all;
      }
    }).replace(imageReg[1], (all, before, unitID, pageID, imageID, after) => {
      const test = [Number(unitID), Number(pageID), Number(imageID)];
      const img = images?.[test[0] - 1]?.[test[1] - 1]?.[test[2] - 1];
      if (img !== undefined) {
        uniquePush(pictures, test);
        return `${before}assets/${test.join("_")}_${img.title}${img.type}${after}`
      } else {
        return all;
      }
    })

  const uniquePush = (pictures, element) => {
    const handler = (item) => item[0] === element[0] &&
      item[1] === element[1] &&
      item[2] === element[2];
    if (!pictures.filter(handler).length)
      pictures.push(element)
  }

  const drawerContent = (
    <div className={classes.sideList}>
      <PersonalInfo
        state={{
          userID: state.userID,
          avatar: avatarURL,
          profile: state.profile,
          listObject: state.listObject,
          lowRank: state.lowRank,
          showMove: state.showMove,
          showKey: state.showKey,
          showCaption: state.showCaption,
          lineTag: state.lineTag,
          hiddenTag: state.hiddenTag,
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
          setShowMove: handle.setShowMove,
          setShowKey: handle.setShowKey,
          setShowCaption: handle.setShowCaption,
          setLineTag: handle.setLineTag,
          setHiddenTag: handle.setHiddenTag,
          addPageMarkdown: addPageMarkdown,
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
          setListObject: handle.setListObject,
          addPageMarkdown: addPageMarkdown
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
