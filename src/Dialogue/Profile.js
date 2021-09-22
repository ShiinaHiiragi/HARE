import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import PersonIcon from "@material-ui/icons/Person";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { maxNameLength } from "../Interface/Constant";
import { PanelContext } from "../Page/Panel";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  avatarProfile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    userSelect: "none"
  },
  largeAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(0, 0, 2, 0)
  },
  notLargeAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  selfProfile: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "45%"
    }
  },
  genderControl: {
    margin: theme.spacing(1),
    width: "45%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  line: {
    display: "flex",
    justifyContent: "center"
  }
}));

export default function Profile(props) {
  const classes = useStyles();
  const { open, state, handle } = props;
  const context = React.useContext(PanelContext);

  const valueChange = (key, targetValue) => {
    handle.setValue((profileValue) => ({
      ...profileValue,
      [key]: targetValue
    }));
  };

  const checkInput = () => {
    let errorMessage = "";
    if (state.value.city.length > maxNameLength) {
      handle.setCheck((prev) => ({ ...prev, city: true }));
      errorMessage = context.lang.message.cityError;
    }
    if (state.value.tel.length > maxNameLength) {
      handle.setCheck((prev) => ({ ...prev, tel: true }));
      errorMessage = context.lang.message.telError;
    }
    if (!/^[\x0-\x7F]*$/.test(state.value.userName)) {
      handle.setCheck((prev) => ({ ...prev, userName: true }));
      errorMessage = context.lang.message.userNameInvalidError;
    }
    if (state.value.userName.length === 0 || state.value.userName.length > maxNameLength) {
      handle.setCheck((prev) => ({ ...prev, userName: true }));
      errorMessage = context.lang.message.userNameLengthError;
    }
    return errorMessage;
  };
  const applyChange = () => {
    const errorMessage = checkInput();
    if (errorMessage === "") {
      context.request("POST/set/profile", {
        userName: state.value.userName,
        birth: state.value.birth,
        gender: state.value.gender,
        tel: state.value.tel,
        city: state.value.city
      }).then(() => {
        handle.setProfile((profile) => ({
          ...profile,
          userName: state.value.userName,
          gender: state.value.gender,
          birth: state.value.birth,
          city: state.value.city,
          tel: state.value.tel
        }));
        handle.close();
      });
    } else handle.toggleMessageBox(errorMessage, "warning");
  };

  return (
    <Dialog fullWidth open={open} onClose={handle.close} style={{ userSelect: "none" }}>
      <DialogContent>
        <div className={classes.avatarProfile}>
          <Avatar src={state.avatar} className={classes.largeAvatar}>
            <PersonIcon className={classes.notLargeAvatar} />
          </Avatar>
          <TextField
            required
            label={context.lang.popup.profile.userName}
            value={state.value.userName}
            inputProps={{
              spellCheck: "false",
              style: { textAlign: "center" }
            }}
            error={state.check.userName}
            onChange={(event) => valueChange("userName", event.target.value)}
          />
        </div>
        <div className={classes.selfProfile}>
          <div className={classes.line}>
            <TextField
              label={context.lang.popup.profile.userID}
              value={state.userID}
              disabled
            />
            <TextField
              label={context.lang.popup.profile.email}
              value={state.value.email}
              disabled
            />
          </div>
          <div className={classes.line}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disableFuture
                variant="inline"
                format={context.lang.popup.profile.timeFormatString}
                margin="normal"
                label={context.lang.popup.profile.birth}
                value={state.value.birth}
                onChange={(value) => {
                  handle.setValue((profileValue) => ({
                    ...profileValue,
                    birth: value
                  }));
                }}
              />
            </MuiPickersUtilsProvider>
            <FormControl className={classes.genderControl}>
              <InputLabel shrink>{context.lang.popup.profile.gender}</InputLabel>
              <Select
                value={state.value.gender}
                className={classes.selectEmpty}
                onChange={(event) => valueChange("gender", event.target.value)}
              >
                <MenuItem value={"U"}>Unknown</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
                <MenuItem value={"M"}>Male</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.line}>
            <TextField
              label={context.lang.popup.profile.tel}
              value={state.value.tel}
              error={state.check.tel}
              onChange={(event) => valueChange("tel", event.target.value)}
            />
            <TextField
              label={context.lang.popup.profile.city}
              value={state.value.city}
              error={state.check.city}
              onChange={(event) => valueChange("city", event.target.value)}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={applyChange} color="secondary">
          {context.lang.common.apply}
        </Button>
        <Button onClick={handle.close} color="primary">
          {context.lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
