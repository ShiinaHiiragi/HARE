import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function MainPage(props) {
  const classes = useStyles();
  const { index, route } = props;

  return (
    <Box
      component="div"
      display={route === index ? "flex" : "none"}
      className={classes.root}
    >
      {props.children}
    </Box>
  );
}
