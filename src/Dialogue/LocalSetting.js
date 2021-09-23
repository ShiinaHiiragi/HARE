import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { PanelContext } from "../Page/Panel";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function LocalSetting(props) {
  const classes = useStyles();
  const { open, state, handle } = props;
  const context = React.useContext(PanelContext);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <DialogTitle>{context.lang.popup.localSetting.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{context.lang.popup.localSetting.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handle.close} color="primary">
          {context.lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
