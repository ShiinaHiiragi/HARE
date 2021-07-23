import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  alarm: {
    color: theme.palette.secondary.main
  }
}));

export default function UnitMenu(props) {
  const classes = useStyles();
  const { lang, state, handle } = props;

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
        {state.fold ? lang.menu.fold : lang.menu.unfold}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handle.closeMenu();
          handle.toggleEditUnit();
        }}
      >
        {lang.menu.editUnit}
      </MenuItem>
      <MenuItem
        disabled={state.top}
        onClick={() => {
          handle.moveUnit(state.unitID - 1);
          handle.closeMenu();
        }}
      >
        {lang.menu.moveUp}
      </MenuItem>
      <MenuItem
        disabled={state.buttom}
        onClick={() => {
          handle.moveUnit(state.unitID);
          handle.closeMenu();
        }}
      >
        {lang.menu.moveDown}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handle.closeMenu();
          handle.toggleNewUnit(state.unitID);
        }}
      >
        {lang.menu.addUnitAbove}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handle.closeMenu();
          handle.toggleNewUnit(state.unitID + 1);
        }}
      >
        {lang.menu.addUnitBelow}
      </MenuItem>
      <MenuItem
        className={classes.alarm}
        onClick={() => {
          handle.closeMenu();
          handle.toggleDeleteConfirm("unit");
        }}
      >
        {lang.menu.deleteUnit}
      </MenuItem>
    </Menu>
  );
}
