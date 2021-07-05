import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function UnitMenu(props) {
  const { state, handleClose } = props;
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
      <MenuItem onClick={handleClose}>Edit Group</MenuItem>
      <MenuItem onClick={handleClose}>Move Up</MenuItem>
      <MenuItem onClick={handleClose}>Move Down</MenuItem>
      <MenuItem onClick={handleClose}>Insert new Booklet</MenuItem>
      <MenuItem onClick={handleClose}>Delete this Group</MenuItem>
    </Menu>
  );
}