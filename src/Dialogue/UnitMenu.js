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

export default function UnitMenu(props) {
  const classes = useStyles();
  const { state, handle } = props;
  const context = React.useContext(PanelContext);

  return (
    <Menu
      keepMounted
      open={state.unitMenu.mouseY !== null}
      onClose={handle.closeMenu}
      anchorReference="anchorPosition"
      anchorPosition={
        state.unitMenu.mouseY !== null && state.unitMenu.mouseX !== null
          ? { top: state.unitMenu.mouseY, left: state.unitMenu.mouseX }
          : undefined
      }
    >
      <MenuItem
        onClick={() => {
          handle.changeUnit(state.unitID);
          handle.closeMenu();
        }}
      >
        {state.fold ? context.lang.menu.fold : context.lang.menu.unfold}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handle.closeMenu();
          handle.toggleEditUnit();
        }}
      >
        {context.lang.menu.editUnit}
      </MenuItem>
      <MenuItem
        disabled={state.top}
        onClick={() => {
          handle.moveUnit(state.unitID - 1);
          handle.closeMenu();
        }}
      >
        {context.lang.menu.moveUp}
      </MenuItem>
      <MenuItem
        disabled={state.buttom}
        onClick={() => {
          handle.moveUnit(state.unitID);
          handle.closeMenu();
        }}
      >
        {context.lang.menu.moveDown}
      </MenuItem>
      <MenuItem
        disabled={state.currentUnitSize >= state.range.maxUnit}
        onClick={() => {
          handle.closeMenu();
          handle.toggleNewUnit(state.unitID);
        }}
      >
        {context.lang.menu.addUnitAbove}
      </MenuItem>
      <MenuItem
        disabled={state.currentUnitSize >= state.range.maxUnit}
        onClick={() => {
          handle.closeMenu();
          handle.toggleNewUnit(state.unitID + 1);
        }}
      >
        {context.lang.menu.addUnitBelow}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handle.closeMenu();
          handle.downloadUnitMarkdown(state.unitID);
        }}
      >
        {context.lang.menu.downloadMarkdown}
      </MenuItem>
      <MenuItem
        className={classes.alarm}
        onClick={() => {
          handle.closeMenu();
          handle.toggleDeleteConfirm("unit");
        }}
      >
        {context.lang.menu.deleteUnit}
      </MenuItem>
    </Menu>
  );
}
