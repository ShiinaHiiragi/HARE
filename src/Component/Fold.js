import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  menuButton: { marginRight: theme.spacing(2) }
}));

export default function Fold(props) {
  const classes = useStyles();
  const { navList, handle } = props;

  return (
    <div>
      <Hidden smDown implementation="css">
        <IconButton
          color="inherit"
          edge="start"
          className={classes.menuButton}
          onClick={navList ? handle.closeNavList : handle.toggleNavList}
        >
          {navList ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Hidden>
      <Hidden mdUp implementation="css">
        <IconButton
          color="inherit"
          edge="start"
          className={classes.menuButton}
          onClick={handle.toggleNavListMobile}
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
    </div>
  );
}
