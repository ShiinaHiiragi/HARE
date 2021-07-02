import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { nameMap } from '../Language/Lang';

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  dialogue: {
    minWidth: "56vw",
  }
}));
const languageList = Object.keys(nameMap);

export default function LanguageSelector(props) {
  const classes = useStyles();
  const handleClose = (targetValue) => {
    props.handleClose(targetValue);
  };
  console.log(nameMap);

  return (
    <Dialog onClose={handleClose} open={props.open}>
      <DialogTitle>
        {props.lang.signIn.languageDialogue}
      </DialogTitle>
      <List>
        {languageList.map((lang) => (
          <ListItem
            onClick={() => handleClose(nameMap[lang])}
            button key={lang}
          >
            <ListItemText primary={lang} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
