import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import { pageIcon } from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  },
  icons: {
    display: "flex",
    justifyContent: "center"
  }
}));

export default function ChangeCover(props) {
  const classes = useStyles();
  const { lang, open, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle>{lang.popup.cover}</DialogTitle>
      <DialogContent className={classes.icons}>
        {pageIcon().map((item) => (
          <IconButton>
            {item}
          </IconButton>
        ))}
      </DialogContent>
    </Dialog>
  );
}
