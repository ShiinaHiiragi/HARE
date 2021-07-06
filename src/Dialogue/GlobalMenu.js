import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function GlobalMenu(props) {
  const { lang, anchor, handleClose } = props;
  return (
    <Menu
      keepMounted
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>{lang.menu.editProfile}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.changeAvatar}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.changeLanguage}</MenuItem>
      <MenuItem onClick={handleClose}>{lang.menu.logout}</MenuItem>
    </Menu>
  );
}