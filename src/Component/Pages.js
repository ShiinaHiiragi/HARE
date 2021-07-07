import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ListIcon from "@material-ui/icons/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import AddIcon from '@material-ui/icons/Add';
import UnitMenu from "../Dialogue/UnitMenu";
import PageMenu from "../Dialogue/PageMenu";
import NewUnitPage from "../Dialogue/NewUnitPage";
import packedGET from "../Interface/Request";
import { initMenu } from "../Interface/Constant";
import clsx from "clsx";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: { paddingLeft: theme.spacing(4) },
  newPage: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  center: { justifyContent: "center" }
}));

export default function Pages(props) {
  const classes = useStyles();
  const { lang, userID, token, handle } = props;
  const [listObject, setListObject] = React.useState([]);
  React.useEffect(() => {
    packedGET({
      uri: "/data/unit",
      query: { userID: userID, token: token },
      msgbox: handle.toggleMessageBox,
      kick: handle.toggleKick,
      lang: lang
    })
      .then((res) => setListObject(res));
  }, []);

  const changeUnit = (targetID) => {
    setListObject(listObject.map((item) => item.unitID === targetID
      ? { ...item, open: !item.open }
      : item
    ));
  };

  const [unitMenu, setUnitMenu] = React.useState(initMenu);
  const [pageMenu, setPageMenu] = React.useState(initMenu);
  const [currentUnitID, setCurrentUnitID] = React.useState(0);
  const [currentPageID, setCurrentPageID] = React.useState(0);
  const [fold, setFold] = React.useState(false);
  const toggleUnitMenu = (event, unitID) => {
    event.preventDefault();
    setCurrentUnitID(unitID);
    setFold(listObject[unitID - 1].open);
    setUnitMenu({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 });
  };
  const togglePageMenu = (event, unitID, pageID) => {
    event.preventDefault();
    setCurrentUnitID(unitID);
    setCurrentPageID(pageID);
    setPageMenu({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 });
  };

  const [newOpen, setNewOpen] = React.useState(false);
  const [newGroup, setNewGroup] = React.useState(false);
  const [newType, setNewType] = React.useState(0);
  const [unitNameValue, setUnitNameValue] = React.useState("");
  const [pageNameValue, setPageNameValue] = React.useState("");
  const [pagePresentValue, setPagePresentValue] = React.useState("");
  const [unitNameCheck, setUnitNameCheck] = React.useState(false);
  const [pageNameCheck, setPageNameCheck] = React.useState(false);
  const [pagePresentCheck, setPagePresentCheck] = React.useState(false);
  const toggleNewUnitPageDialogue = (group, type) => {
    setUnitNameValue("");
    setPageNameValue("");
    setPagePresentValue("");
    setUnitNameCheck(false);
    setPageNameCheck(false);
    setPagePresentCheck(false);
    setNewGroup(group);
    setNewType(type);
    setNewOpen(true);
  }

  return (
      <div className={classes.newPage}>
        {listObject.length !== 0 ?
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
                      item.pages.map((subItem, subIndex) => (
                        <ListItem
                          key={subIndex}
                          onContextMenu={(event) => 
                            togglePageMenu(event, item.unitID, subItem.pageID)}
                          button className={classes.nested}
                        >
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
            lang={lang}
            state={{
              unitMenu: unitMenu,
              unitID: currentUnitID,
              fold: fold
            }}
            handle={{
              toggleNewUnit: (pos) => toggleNewUnitPageDialogue(true, pos),
              closeMenu: () => setUnitMenu(initMenu),
              changeUnit: changeUnit
            }}
          />
          <PageMenu
            lang={lang}
            state={{
              pageMenu: pageMenu,
              unitID: currentUnitID,
              pageID: currentPageID
            }}
            handle={{
              toggleNewPage: (pos) => toggleNewUnitPageDialogue(false, pos),
              closeMenu: () => setPageMenu(initMenu)
            }}
          />
        </List> :
        <div className={clsx(classes.newPage, classes.center)}>
          <IconButton onClick={() => toggleNewUnitPageDialogue(true, 0)}>
            <AddIcon fontSize="large"/>
          </IconButton>
          <Typography variant="button" color="textSecondary" align="center">
            {lang.panel.initUnit}
          </Typography>
        </div>}
        <NewUnitPage 
          lang={lang}
          userID={userID} token={token}
          open={newOpen} group={newGroup} type={newType}
          text={{
            unitNameValue: unitNameValue,
            pageNameValue: pageNameValue,
            pagePresentValue: pagePresentValue,
            unitNameCheck: unitNameCheck,
            pageNameCheck: pageNameCheck,
            pagePresentCheck: pagePresentCheck
          }}
          handle={{
            setListObject: setListObject,
            setUnitNameValue: setUnitNameValue,
            setPageNameValue: setPageNameValue,
            setPagePresentValue: setPagePresentValue,
            setUnitNameCheck: setUnitNameCheck,
            setPageNameCheck: setPageNameCheck,
            setPagePresentCheck: setPagePresentCheck,
            toggleMessageBox: handle.toggleMessageBox,
            toggleKick: handle.toggleKick,
            close: () => setNewOpen(false)
          }}
        />
      </div>
  );
}
