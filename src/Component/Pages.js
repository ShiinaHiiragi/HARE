import React from "react";
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
import UnitMenu from "../Dialogue/UnitMenu";

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
  const handleClick = () => setOpen(!open);

  const [unitMenu, setUnitMenu] = React.useState({ mouseX: null, mouseY: null });
  const toggleUnitMenu = (event) => {
    event.preventDefault();
    setUnitMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  return (
    <List onContextMenu={() => {}} component="nav" className={classes.list}>
      <ListItem onContextMenu={toggleUnitMenu} button onClick={handleClick}>
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
      <UnitMenu
        state={unitMenu}
        handleClose={() => setUnitMenu({ mouseX: null, mouseY: null })}
      />
    </List>
  );
}
