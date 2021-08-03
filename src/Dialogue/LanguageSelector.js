import React from "react";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { nameMap } from "../Language/Lang";
import { PanelContext } from "../Page/Panel";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

const languageList = Object.keys(nameMap);
export default function LanguageSelector(props) {
  const classes = useStyles();
  const { open, handleClose } = props;
  const context = React.useContext(PanelContext);

  return (
    <Dialog
      fullWidth
      onClose={() => handleClose(null)}
      open={open}
      maxWidth="xs"
      className={classes.noneSelect}
    >
      <DialogTitle>{context.lang.popup.language}</DialogTitle>
      <List>
        {languageList.map((lang) => (
          <ListItem
            onClick={() => handleClose(nameMap[lang])}
            button
            key={lang}
          >
            <ListItemAvatar>
              <Avatar>{lang.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={lang} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
