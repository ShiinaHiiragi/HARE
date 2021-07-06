import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function UnitMenu(props) {
  const { lang, state, handleClose } = props;
  return (
    <Menu
      keepMounted
      open={state.mouseY !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        state.mouseY !== null && state.mouseX !== null
          ? { top: state.mouseY, left: state.mouseX }
          : undefined
      }
    >
      <MenuItem onClick={handleClose}>{lang.menu.editGroup}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.moveUp}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.moveDown}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.addUnitAbove}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.addUnitBelow}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.deleteUnit}</MenuItem>
    </Menu>
  );
}