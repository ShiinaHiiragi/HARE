import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { nameMap } from '../Language/Lang';

const languageList = Object.keys(nameMap);
export default function LanguageSelector(props) {
  const handleClose = (targetValue) => {
    props.handleClose(targetValue);
  };

  return (
    <Dialog
      onClose={() => handleClose(null)}
      open={props.open}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        {props.lang.signIn.languageDialogue}
      </DialogTitle>
      <List>
        {languageList.map((lang) => (
          <ListItem
            onClick={() => handleClose(nameMap[lang])}
            button key={lang}
          >
            <ListItemAvatar>
              <Avatar>
                {lang.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={lang} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
