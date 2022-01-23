import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { PanelContext } from "../Page/Panel";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  alarm: {
    color: theme.palette.secondary.main
  }
}));

export default function PageMenu(props) {
  const classes = useStyles();
  const { state, handle } = props;
  const context = React.useContext(PanelContext);

  return (
    <Menu
      keepMounted
      open={state.pageMenu.mouseY !== null}
      onClose={handle.closeMenu}
      anchorReference="anchorPosition"
      anchorPosition={
        state.pageMenu.mouseY !== null && state.pageMenu.mouseX !== null
          ? { top: state.pageMenu.mouseY, left: state.pageMenu.mouseX }
          : undefined
      }
    >
      <MenuItem
        onClick={() => {
          handle.closeMenu();
          handle.toggleNewPage([state.unitID, state.pageID], true);
        }}
      >
        {context.lang.menu.editPage}
      </MenuItem>
      <MenuItem
        disabled={state.top}
        onClick={() => {
          handle.movePage([state.unitID, state.pageID - 1]);
          handle.closeMenu();
        }}
      >
        {context.lang.menu.moveUp}
      </MenuItem>
      <MenuItem
        disabled={state.buttom}
        onClick={() => {
          handle.movePage([state.unitID, state.pageID]);
          handle.closeMenu();
        }}
      >
        {context.lang.menu.moveDown}
      </MenuItem>
      <MenuItem
        disabled={state.currentPageSize >= state.range.maxPage}
        onClick={() => {
          handle.closeMenu();
          handle.toggleNewPage([state.unitID, state.pageID]);
        }}
      >
        {context.lang.menu.addPageAbove}
      </MenuItem>
      <MenuItem
        disabled={state.currentPageSize >= state.range.maxPage}
        onClick={() => {
          handle.closeMenu();
          handle.toggleNewPage([state.unitID, state.pageID + 1]);
        }}
      >
        {context.lang.menu.addPageBelow}
      </MenuItem>
      <MenuItem
        disabled={state.currentPageSize >= state.range.maxPage}
        onClick={() => {
          handle.closeMenu();
          handle.downloadPageMarkdown(state.unitID, state.pageID);
        }}
      >
        {context.lang.menu.downloadMarkdown}
      </MenuItem>
      <MenuItem
        className={classes.alarm}
        onClick={() => {
          handle.closeMenu();
          handle.toggleDeleteConfirm("page");
        }}
      >
        {context.lang.menu.deletePage}
      </MenuItem>
    </Menu>
  );
}
