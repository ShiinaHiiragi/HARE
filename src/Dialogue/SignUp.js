import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function SignUp(props) {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={props.handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle>{props.lang.popup.signUp.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.lang.popup.signUp.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          {props.lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
