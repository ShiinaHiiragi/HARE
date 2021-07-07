import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function UnitMenu(props) {
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
      <MenuItem onClick={handle.closeMenu}>{lang.menu.editUnit}</MenuItem>
      <MenuItem onClick={handle.closeMenu}>{lang.menu.moveUp}</MenuItem>
      <MenuItem onClick={handle.closeMenu}>{lang.menu.moveDown}</MenuItem>
      <MenuItem onClick={() => {
        handle.closeMenu();
        handle.toggleNewUnit(state.unitID);
      }}>
        {lang.menu.addUnitAbove}
      </MenuItem>
      <MenuItem onClick={() => {
        handle.closeMenu();
        handle.toggleNewUnit(state.unitID + 1);
      }}>
        {lang.menu.addUnitBelow}
      </MenuItem>
      <MenuItem onClick={handle.closeMenu}>{lang.menu.deleteUnit}</MenuItem>
    </Menu>
  );
}