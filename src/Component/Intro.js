import Typography from "@material-ui/core/Typography";
import IntroGraph from "../Interface/intro.png"

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  graph: {
    maxWidth: "200px",
    maxHeight: "200px",
    paddingBottom: theme.spacing(2)
  }
}));

export default function Intro(props) {
  const classes = useStyles();
  const { lang } = props;

  return (
    <div className={classes.root}>
      <img src={IntroGraph} className={classes.graph} />
      <Typography variant="body2" color="textSecondary" align="center">
        I am cute. Please give me money.
      </Typography>
    </div>
  );
}
