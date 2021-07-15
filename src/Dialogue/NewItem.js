import React from "react";
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

export default function NewItem(props) {
  const classes = useStyles();
  const { lang, data, state, handle } = props;

  return (
    <Dialog
      fullWidth
      open={state.open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <DialogTitle> {"TEST"} </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {"Hello"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handle.close} color="secondary">
          {lang.common.apply}
        </Button>
        <Button onClick={handle.close} color="primary">
          {lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
