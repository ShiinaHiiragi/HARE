import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function DeleteConfirm(props) {
  const classes = useStyles();
  const { lang, open, handleClose } = props;

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle>111222333</DialogTitle>
      <DialogContent>
        <DialogContentText>
          123
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
