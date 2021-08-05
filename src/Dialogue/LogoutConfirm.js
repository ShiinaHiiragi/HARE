import React from "react";
import ReactDOM from "react-dom";
import cookie from "react-cookies";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import SignIn from "../Page/SignIn";
import { setStateDelay } from "../Interface/Constant";
import { PanelContext } from "../Page/Panel";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function LogoutComfirm(props) {
  const classes = useStyles();
  const { open, userID, handleClose, handleToggleMessageBox } = props;
  const context = React.useContext(PanelContext);

  const logout = () => {
    cookie.remove("userID");
    cookie.remove("token");
    ReactDOM.render(<SignIn />, document.getElementById("root"));
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle>{context.lang.popup.logout.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{context.lang.popup.logout.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            const quit = () => setTimeout(logout, setStateDelay * 0.8);
            context.request("POST/data/logout", { }, quit).then(quit);
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
