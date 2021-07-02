import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function FormTip(props) {
  return (
    <Grid container>
      <Grid item xs>
        <Link href="#" variant="body2">
          {props.lang.signIn.language}
        </Link>
      </Grid>
      <Grid item>
        <Link href="#" variant="body2">
          {props.lang.signIn.signUp}
        </Link>
      </Grid>
    </Grid>
  );
}

export default function SignInForm(props) {
  const classes = useStyles();
  return (
    <form className={classes.form} noValidate>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label={props.lang.signIn.email}
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label={props.lang.signIn.password}
        type="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label={props.lang.signIn.memory}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {props.lang.signIn.button}
      </Button>
      <FormTip lang={props.lang}/>
    </form>
  );
}
