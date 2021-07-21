import ReactDOM from "react-dom";
import axios from "axios";
import cookie from "react-cookies";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import requestURL from "../Interface/Constant";
import SignIn from "../Page/SignIn";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function LogoutComfirm(props) {
  const classes = useStyles();
  const { lang, open, userID, token, handleClose } = props;
  const logout = () => {
    // we don't use packedPOST because we don't need callback
    axios.post(`${requestURL}/data/logout`, { userID: userID, token: token });
    ReactDOM.render(<SignIn />, document.getElementById("root"));
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle>{lang.popup.logout.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{lang.popup.logout.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            cookie.remove("userID");
            cookie.remove("token");
            setTimeout(logout, 400);
          }}
          color="secondary"
        >
          {lang.common.yes}
        </Button>
        <Button onClick={handleClose} color="primary">
          {lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
