import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { PanelContext } from "../Page/Panel";
import { setStateDelay, stringFormat, rangePassword } from "../Interface/Constant";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  },
  new: {
    margin: theme.spacing(1, 0)
  }
}));

export default function Password(props) {
  const classes = useStyles();
  const { open, handle } = props;
  const context = React.useContext(PanelContext);

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [oldCheck, setOldCheck] = React.useState(false);
  const [newCheck, setNewCheck] = React.useState(false);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setOldPassword("");
        setNewPassword("");
        setOldCheck(false);
        setNewCheck(false);
      }, setStateDelay);
    }
  }, [open]);

  const submit = () => {
    const blankOld = oldPassword.length === 0;
    const errorNewRange = newPassword.length < rangePassword[0]
      || newPassword.length > rangePassword[1];
    setOldCheck(blankOld);
    setNewCheck(errorNewRange);
    if (blankOld) {
      handle.toggleMessageBox(context.lang.message.oldPasswordBlank, "warning");
      return;
    } else if (errorNewRange) {
      handle.toggleMessageBox(context.lang.message.newPasswordRange, "warning");
      return;
    }
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <DialogTitle>{context.lang.popup.password.title}</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ margin: 0 }}>
          {stringFormat(context.lang.popup.password.text, [...rangePassword])}
        </DialogContentText>
        <TextField
          margin="dense"
          fullWidth
          label={context.lang.popup.password.old}
          type="password"
          error={oldCheck}
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
        />
        <FormControl fullWidth className={classes.new}>
          <InputLabel>{context.lang.popup.password.new}</InputLabel>
          <Input
            type={show ? "text" : "password"}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            error={newCheck}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShow((show) => !show)}>
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={submit} color="secondary">
          {context.lang.common.apply}
        </Button>
        <Button onClick={handle.close} color="primary">
          {context.lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
