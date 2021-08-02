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
  title: {
    paddingBottom: theme.spacing(0)
  },
  icons: {
    display: "flex",
    justifyContent: "center"
  }
}));

export default function ChangeCover(props) {
  const classes = useStyles();
  const { lang, open, cover, handleClose, handleChange } = props;
  const submit = (index) => {
    if (index !== cover) handleChange(index);
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle className={classes.title}>{lang.popup.edit.cover}</DialogTitle>
      <DialogContent className={classes.icons}>
        {pageIcon().map((item, index) => (
          <IconButton
            key={index}
            disabled={index === cover ? true : false}
            onClick={() => submit(index)}
          >
            {item}
          </IconButton>
        ))}
      </DialogContent>
    </Dialog>
  );
}
