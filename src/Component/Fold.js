import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  menuButton: {marginRight: theme.spacing(2)}
}));

export default function Fold(props) {
  const classes = useStyles();
  return (
    <IconButton
      color="inherit"
      edge="start"
      className={classes.menuButton}
      // onClick={
      //   panelPopup.sideListItem
      //     ? handleSideListItemClose
      //     : handleSideListItemToggle
      // }
    >
      {true ? (
        <Tooltip title="Fold" placement="bottom">
          <ChevronLeftIcon />
        </Tooltip>
      ) : (
        <Tooltip title="Unfold" placement="bottom">
          <MenuIcon />
        </Tooltip>
      )}
    </IconButton>
  );
}