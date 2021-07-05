import React from "react";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Collapse from "@material-ui/core/Collapse";
import ListIcon from "@material-ui/icons/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

export default function PersonalInfo(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [_open, _setOpen] = React.useState(true);
  const handleClick = () => setOpen(!open);
  const _handleClick = () => _setOpen(!_open);

  return (
    <List component="nav" className={classes.list}>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Operating System" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <TurnedInNotIcon />
            </ListItemIcon>
            <ListItemText primary="Process" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemAvatar>
              <ListItemIcon>
                <TurnedInNotIcon />
              </ListItemIcon>
            </ListItemAvatar>
            <ListItemText primary="TLB" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={_handleClick}>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Networks" />
        {_open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={_open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <TurnedInNotIcon />
            </ListItemIcon>
            <ListItemText primary="TCP/IP" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <TurnedInNotIcon />
            </ListItemIcon>
            <ListItemText primary="DNS" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
