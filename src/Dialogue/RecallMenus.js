import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  hoverMenu: {
    borderRadius: 0
  }
}));

export default function RecallMenu(props) {
  const classes = useStyles();
  const { lang, anchor, handle } = props;

  return (
    <Menu
      keepMounted
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={handle.close}
      MenuListProps={{ onMouseLeave: handle.close }}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      classes={{
        paper: classes.hoverMenu
      }}
    >
      <MenuItem onClick={handle.close}>{lang.grid.menu.recallSelected}</MenuItem>
      <MenuItem onClick={handle.close}>{lang.grid.menu.recallFar}</MenuItem>
    </Menu>
  );
}
