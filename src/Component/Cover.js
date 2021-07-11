
import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  }
}));

export default function Cover(props) {
  const classes = useStyles();
  const { lang, current } = props;

  return (
    <div className={classes.root}>
      {JSON.stringify(current)}
    </div>
  );
}
