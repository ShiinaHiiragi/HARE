import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ListIcon from "@material-ui/icons/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import UnitMenu from "../Dialogue/UnitMenu";
import packedGET from "../Interface/Request";

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

export default function Pages(props) {
  const classes = useStyles();
  const { lang, userID, token, toggleMessageBox } = props;
  const [listObject, setListObject] = React.useState([]);
  React.useEffect(() => {
    packedGET({
      uri: "/data/pages",
      query: { userID: userID, token: token },
      msgbox: toggleMessageBox,
      lang: lang
    })
      .then((res) => {
        setListObject(res.data);
      });
  }, []);

  const changeUnit = (targetID) => {
    setListObject(listObject.map((item) => item.unitID === targetID
      ? { ...item, open: !item.open }
      : item
    ));
  };

  const [unitMenu, setUnitMenu] = React.useState({ mouseX: null, mouseY: null });
  const toggleUnitMenu = (event, userID) => {
    event.preventDefault();
    setUnitMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  return (
    <List component="nav" className={classes.list}>
      {
        listObject.map((item, index) => (
          <div key={index}>
            <ListItem
              onContextMenu={(event) => toggleUnitMenu(event, item.unitID)} button
              onClick={() => changeUnit(item.unitID)}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={item.unitName} />
              {item.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={item.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {
                  item.pages.map((subItem) => (
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <TurnedInNotIcon />
                      </ListItemIcon>
                      <ListItemText primary={subItem.pageName} />
                    </ListItem>
                  ))
                }
              </List>
            </Collapse>
          </div>
        ))
      }
      <UnitMenu
        state={unitMenu}
        handleClose={() => setUnitMenu({ mouseX: null, mouseY: null })}
      />
    </List>
  );
}
