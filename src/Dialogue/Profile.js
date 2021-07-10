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
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { nameMaxLength } from "../Interface/Constant";
import { packedPOST } from "../Interface/Request";

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
  const { lang, open, data, value, check, handle } = props;
  const valueChange = (key, targetValue) => {
    handle.setValue((profileValue) => ({
      ...profileValue, [key]: targetValue
    }));
  }

  const checkInput = () => {
    let errorMessage = "";
    if (value.city.length > nameMaxLength) {
      handle.setCheck((prev) => ({ ...prev, city: true }));
      errorMessage = lang.message.cityError;
    }
    if (value.tel.length > nameMaxLength) {
      handle.setCheck((prev) => ({ ...prev, tel: true }));
      errorMessage = lang.message.telError;
    }
    if (!/^[\x0-\x7F]*$/.test(value.userName)) {
      handle.setCheck((prev) => ({ ...prev, userName: true }));
      errorMessage = lang.message.userNameInvalidError;
    }
    if (value.userName.length === 0 || value.userName.length > nameMaxLength) {
      handle.setCheck((prev) => ({ ...prev, userName: true }));
      errorMessage = lang.message.userNameLengthError;
    }
    return errorMessage;
  }
  const applyChange = () => {
    const errorMessage = checkInput();
    if (errorMessage === "") {
      packedPOST({
        uri: "/set/profile",
        query: {
          userID: data.userID,
          token: data.token,
          userName: value.userName,
          birth: value.birth,
          gender: value.gender,
          tel: value.tel,
          city: value.city
        },
        msgbox: handle.toggleMessageBox,
        kick: handle.toggleKick,
        lang: lang
      }).then((out) => {
        handle.setProfile((profile) => ({
          ...profile,
          userName: value.userName,
          gender: value.gender,
          birth: value.birth,
          city: value.city,
          tel: value.tel
        }));
        handle.close();
      })
    } else handle.toggleMessageBox(errorMessage, "warning");
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handle.close}
    >
      <DialogContent>
        <div className={classes.avatarProfile}>
          <Avatar
            src={data.avatar}
            className={classes.largeAvatar}
          >
            <PersonIcon className={classes.notLargeAvatar} />
          </Avatar>
          <TextField
            required
            label={lang.popup.profile.userName}
            value={value.userName}
            inputProps={{
              spellCheck: "false",
              style: { textAlign: "center" }
            }}
            error={check.userName}
            onChange={(event) => valueChange("userName", event.target.value)}
          />
        </div>
        <div className={classes.selfProfile}>
          <div className={classes.line}>
            <TextField
              label={lang.popup.profile.userID}
              value={data.userID}
              disabled
            />
            <TextField
              label={lang.popup.profile.email}
              value={value.email}
              disabled
            />
          </div>
          <div className={classes.line}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disableFuture
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                label={lang.popup.profile.birth}
                value={value.birth}
                onChange={(value) => {
                  handle.setValue((profileValue) => ({
                    ...profileValue, birth: value
                  }));
                }}
              />
            </MuiPickersUtilsProvider>
            <FormControl className={classes.genderControl}>
              <InputLabel shrink>{lang.popup.profile.gender}</InputLabel>
              <Select
                value={value.gender}
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
              label={lang.popup.profile.tel}
              value={value.tel}
              error={check.tel}
              onChange={(event) => valueChange("tel", event.target.value)}
            />
            <TextField
              label={lang.popup.profile.city}
              value={value.city}
              error={check.city}
              onChange={(event) => valueChange("city", event.target.value)}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={applyChange} color="secondary">
          {lang.common.apply}
        </Button>
        <Button onClick={handle.close} color="primary">
          {lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
