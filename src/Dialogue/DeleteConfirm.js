import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { stringFormat } from "../Interface/Constant";
import { PanelContext } from "../Page/Panel";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function DeleteConfirm(props) {
  const classes = useStyles();
  const { open, type, name, handleClose, handleDeleteTarget } = props;
  const context = React.useContext(PanelContext);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle>{context.lang.popup.delete.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {stringFormat(context.lang.popup.delete[type], [name])}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            handleDeleteTarget();
          }}
          color="secondary"
        >
          {context.lang.common.yes}
        </Button>
        <Button onClick={handleClose} color="primary">
          {context.lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
