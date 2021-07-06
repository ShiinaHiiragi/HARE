import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function PageMenu(props) {
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
      <MenuItem onClick={handleClose}>{lang.menu.editPage}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.moveUp}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.moveDown}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.addPageAbove}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.addPageBelow}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.deletePage}</MenuItem>
    </Menu>
  );
}