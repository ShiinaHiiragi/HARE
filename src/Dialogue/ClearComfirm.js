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

export default function ClearConfirm(props) {
  const classes = useStyles();
  const { lang, open, handleClose, handleRecall } = props;

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle>{lang.popup.clear.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {lang.popup.clear.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            handleRecall(false);
          }}
          color="secondary"
        >
          {lang.popup.clear.continue}
        </Button>
        <Button
          onClick={() => {
            handleClose();
            handleRecall(true);
          }}
          color="secondary"
        >
          {lang.popup.clear.restart}
        </Button>
        <Button onClick={handleClose} color="primary">
          {lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
