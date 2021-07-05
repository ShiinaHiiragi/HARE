import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%"
  }
}));

export default function Root(props) {
  const classes = useStyles();
  return <div className={classes.root}> {props.children} </div>;
}
