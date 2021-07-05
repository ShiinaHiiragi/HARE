import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    alignItems: "center",
    padding: theme.spacing(0, 0),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

export default function Header() {
  const classes = useStyles();
  return <div className={classes.drawerHeader} />;
}
