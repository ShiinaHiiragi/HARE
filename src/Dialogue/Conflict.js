import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { nil } from "../Interface/Constant";
import { PanelContext } from "../Page/Panel";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function Conflict(props) {
  const { open } = props;
  const classes = useStyles();
  const context = React.useContext(PanelContext);

  return (
    <Dialog fullWidth open={open} onClose={nil} className={classes.noneSelect}>
      <DialogTitle>{context.lang.popup.conflict.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{context.lang.popup.conflict.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => window.location.reload()}
          color="secondary"
        >
          {context.lang.common.ok}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
