import Title from "../Component/Title";
import SignInForm from "../Component/Form";
import Copyright from "../Component/Copyright";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default function SignInPaper() {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Title />
      <SignInForm />
      <Copyright />
    </div>
  );
}