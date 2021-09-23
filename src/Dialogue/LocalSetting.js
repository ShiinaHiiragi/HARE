import React from "react";
import cookie from "react-cookies";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { PanelContext } from "../Page/Panel";
import { cookieTime } from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  },
  text: {
    marginBottom: 0
  },
  formControl: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  formLabel: {
    width: "60%",
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2, 0)
    }
  },
  radioGroup: {
    width: "40%",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    }
  },
  selector: {
    width: "40%",
  },
  formControlLabel: {
    [theme.breakpoints.up("sm")]: {
      width: "45%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    }
  }
}));

export default function LocalSetting(props) {
  const classes = useStyles();
  const { open, state, handle } = props;
  const context = React.useContext(PanelContext);

  const changeRank = (event) => {
    handle.setLowRank(event.target.value === "true");
    cookie.save("lowRank", event.target.value, { expires: cookieTime(3650) });
  }
  const changeMove = (event) => {
    handle.setHideMove(event.target.value === "true");
    cookie.save("hideMove", event.target.value, { expires: cookieTime(3650) });
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <DialogTitle>{context.lang.popup.localSetting.title}</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.text}>
          {context.lang.popup.localSetting.text}
        </DialogContentText>
          <FormControl className={classes.formControl}>
            <FormLabel className={classes.formLabel}>
              {context.lang.popup.localSetting.ranking}
            </FormLabel>
            <RadioGroup
              className={classes.radioGroup}
              value={String(state.lowRank)}
              onChange={changeRank}
            >
              <FormControlLabel
                className={classes.formControlLabel}
                value={"true"}
                control={<Radio />}
                label="A ~ F"
              />
              <FormControlLabel
                className={classes.formControlLabel}
                value={"false"}
                control={<Radio />}
                label="X ~ D"
              />
            </RadioGroup>
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormLabel className={classes.formLabel}>
              {context.lang.popup.localSetting.moveButton}
            </FormLabel>
            <RadioGroup
              className={classes.radioGroup}
              value={String(state.hideMove)}
              onChange={changeMove}
            >
              <FormControlLabel
                className={classes.formControlLabel}
                value={"false"}
                control={<Radio />}
                label={context.lang.popup.localSetting.showMoveButton}
              />
              <FormControlLabel
                className={classes.formControlLabel}
                value={"true"}
                control={<Radio />}
                label={context.lang.popup.localSetting.hideMoveButton}
              />
            </RadioGroup>
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormLabel className={classes.formLabel}>
              {context.lang.popup.localSetting.language}
            </FormLabel>
            <Select
              className={classes.selector}
              // value={age}
              // onChange={handleChange}
              // displayEmpty
              // className={classes.selectEmpty}
            >
              <MenuItem value={0}>Zero</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handle.close} color="primary">
          {context.lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
