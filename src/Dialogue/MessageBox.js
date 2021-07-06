import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  snack: {
    userSelect: "none",
    maxWidth: "512px",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const messageBoxDuration = 1600;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MessageBox(props) {
  const classes = useStyles();

  return (
    <Snackbar
      open={props.open}
      onClose={props.handleClose}
      autoHideDuration={messageBoxDuration}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      className={classes.snack}
    >
      <Alert onClose={props.handleClose} severity={props.messageBoxType}>
        {props.messageBoxMessage}
      </Alert>
    </Snackbar>
  );
}
