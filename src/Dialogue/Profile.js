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
            label="Username"
            value={value.userName}
            inputProps={{
              spellCheck: "false",
              style: { textAlign: "center" }
            }}
            onChange={(event) => valueChange("userName", event.target.value)}
          />
        </div>
        <div className={classes.selfProfile}>
          <div className={classes.line}>
            <TextField
              label="UID"
              value={data.userID}
              disabled
            />
            <TextField
              label="E-mail"
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
                label="Birthday"
                value={value.birth}
                onChange={(value) => {
                  handle.setValue((profileValue) => ({
                    ...profileValue, birth: value
                  }));
                }}
              />
            </MuiPickersUtilsProvider>
            <FormControl className={classes.genderControl}>
              <InputLabel shrink>Gender</InputLabel>
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
              label="TEL"
              value={value.tel}
              onChange={(event) => valueChange("tel", event.target.value)}
            />
            <TextField
              label="City"
              value={value.city}
              onChange={(event) => valueChange("city", event.target.value)}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handle.close} color="secondary">
          Apply
        </Button>
        <Button onClick={handle.close} color="primary">
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
}
