import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function PageMenu(props) {
  const { lang, state, handle } = props;
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
      <MenuItem onClick={handle.closeMenu}>{lang.menu.editPage}</MenuItem>
      <MenuItem
        disabled={state.top}
        onClick={() => {
          handle.movePage([state.unitID, state.pageID - 1]);
          handle.closeMenu();
        }}
      >
        {lang.menu.moveUp}
        </MenuItem>
      <MenuItem
        disabled={state.buttom}
        onClick={() => {
          handle.movePage([state.unitID, state.pageID]);
          handle.closeMenu();
        }}
      >
        {lang.menu.moveDown}
      </MenuItem>
      <MenuItem onClick={() => {
        handle.closeMenu();
        handle.toggleNewPage([state.unitID, state.pageID])
      }}>
        {lang.menu.addPageAbove}
      </MenuItem>
      <MenuItem onClick={() => {
        handle.closeMenu();
        handle.toggleNewPage([state.unitID, state.pageID + 1])
      }}>
        {lang.menu.addPageBelow}
      </MenuItem>
      <MenuItem onClick={handle.closeMenu}>{lang.menu.deletePage}</MenuItem>
    </Menu>
  );
}