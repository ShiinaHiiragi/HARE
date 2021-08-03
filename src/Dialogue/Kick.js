import React from "react";
import ReactDOM from "react-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import SignIn from "../Page/SignIn";
import { nil } from "../Interface/Constant";
import { PanelContext } from "../Page/Panel";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function Kick(props) {
  const { open, handleClose } = props;
  const classes = useStyles();
  const context = React.useContext(PanelContext);

  return (
    <Dialog fullWidth open={open} onClose={nil} className={classes.noneSelect}>
      <DialogTitle>{context.lang.popup.kick.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{context.lang.popup.kick.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            setTimeout(
              () =>
                ReactDOM.render(<SignIn />, document.getElementById("root")),
              400
            );
          }}
          color="secondary"
        >
          {context.lang.common.ok}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
