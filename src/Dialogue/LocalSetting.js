import React from "react";
import clsx from "clsx";
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
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import { PanelContext } from "../Page/Panel";
import { nameMap } from "../Language/Lang";
import { cookieTime } from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
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
  marginTopLess: {
    marginTop: 8
  },
  marginTop: {
    marginTop: 12
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
    marginTop: "8px !important"
  },
  textField: {
    width: "40%",
  },
  formControlLabel: {
    [theme.breakpoints.up("sm")]: {
      width: "45%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    }
  },
  codeFont: {
    "& input": {
      fontFamily: "'consolas', monospace !important"
    }
  }
}));

export default function LocalSetting(props) {
  const classes = useStyles();
  const { open, state, handle } = props;
  const context = React.useContext(PanelContext);

  const [lineTagFocus, setLineTagFocus] = React.useState(false);

  const changeRank = (event) => {
    handle.setLowRank(event.target.value === "true");
    cookie.save("lowRank", event.target.value, { expires: cookieTime(3650) });
  }
  const changeMove = (event) => {
    handle.setShowMove(event.target.value === "true");
    cookie.save("showMove", event.target.value, { expires: cookieTime(3650) });
  }
  const changeKey = (event) => {
    handle.setShowKey(event.target.value === "true");
    cookie.save("showKey", event.target.value, { expires: cookieTime(3650) });
  }
  const changeCaption = (event) => {
    handle.setShowCaption(event.target.value === "true");
    cookie.save("showCaption", event.target.value, { expires: cookieTime(3650) });
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
                control={<Radio color="primary" />}
                label="A ~ F"
              />
              <FormControlLabel
                className={classes.formControlLabel}
                value={"false"}
                control={<Radio color="primary" />}
                label="X ~ D"
              />
            </RadioGroup>
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormLabel className={classes.formLabel}>
              {context.lang.popup.localSetting.showCaption}
            </FormLabel>
            <RadioGroup
              className={classes.radioGroup}
              value={String(state.showCaption)}
              onChange={changeCaption}
            >
              <FormControlLabel
                className={classes.formControlLabel}
                value={"true"}
                control={<Radio color="primary" />}
                label={context.lang.popup.localSetting.showButton}
              />
              <Tooltip
                title={context.lang.popup.localSetting.hideCaptionTip}
                classes={{ tooltip: classes.noneSelect }}
              >
                <FormControlLabel
                  className={classes.formControlLabel}
                  value={"false"}
                  control={<Radio color="primary" />}
                  label={context.lang.popup.localSetting.hideButton}
                />
              </Tooltip>
            </RadioGroup>
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormLabel className={classes.formLabel}>
              {context.lang.popup.localSetting.showKey}
            </FormLabel>
            <RadioGroup
              className={classes.radioGroup}
              value={String(state.showKey)}
              onChange={changeKey}
            >
              <FormControlLabel
                className={classes.formControlLabel}
                value={"true"}
                control={<Radio color="primary" />}
                label={context.lang.popup.localSetting.showButton}
              />
              <FormControlLabel
                className={classes.formControlLabel}
                value={"false"}
                control={<Radio color="primary" />}
                label={context.lang.popup.localSetting.hideButton}
              />
            </RadioGroup>
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormLabel className={classes.formLabel}>
              {context.lang.popup.localSetting.moveButton}
            </FormLabel>
            <RadioGroup
              className={classes.radioGroup}
              value={String(state.showMove)}
              onChange={changeMove}
            >
              <FormControlLabel
                className={classes.formControlLabel}
                value={"true"}
                control={<Radio color="primary" />}
                label={context.lang.popup.localSetting.showButton}
              />
              <Tooltip
                title={context.lang.popup.localSetting.hideMoveTip}
                classes={{ tooltip: classes.noneSelect }}
              >
                <FormControlLabel
                  className={classes.formControlLabel}
                  value={"false"}
                  control={<Radio color="primary" />}
                  label={context.lang.popup.localSetting.hideButton}
                />
              </Tooltip>
            </RadioGroup>
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormLabel className={clsx(classes.formLabel, classes.marginTopLess)}>
              {context.lang.popup.localSetting.language}
            </FormLabel>
            <Select
              className={classes.selector}
              value={state.languageName}
              onChange={(event) => handle.changeGlobalLang(event.target.value)}
            >
              {Object.keys(nameMap).map((displayName, index) => (
                <MenuItem value={nameMap[displayName]} key={index}>{displayName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            className={clsx(classes.formControl, classes.marginTop)}
            focused={lineTagFocus}
          >
            <FormLabel className={classes.formLabel}>
              {context.lang.popup.localSetting.lineTag}
            </FormLabel>
            <TextField
              className={classes.textField}
              classes={{ root: classes.codeFont }}
              value={state.lineCode}
              error={!state.localLineReg.test(state.lineCode)}
              onFocus={() => setLineTagFocus(true)}
              onBlur={() => setLineTagFocus(false)}
              onChange={(event) => handle.setLineCode(event.target.value)}
            />
          </FormControl>
          <FormControl
            className={clsx(classes.formControl, classes.marginTop)}
          >
            <FormLabel className={classes.formLabel}>
              {context.lang.popup.localSetting.querySeparator}
            </FormLabel>
            <Tooltip
              title={context.lang.popup.localSetting.separatorTip}
              classes={{ tooltip: classes.noneSelect }}
            >
              <TextField
                className={classes.textField}
                classes={{ root: classes.codeFont }}
                value={state.querySeparator}
                onChange={(event) => handle.setQuerySeparator(event.target.value)}
              />
            </Tooltip>
          </FormControl>
          <FormControl
            className={clsx(classes.formControl, classes.marginTop)}
          >
            <FormLabel className={classes.formLabel}>
              {context.lang.popup.localSetting.keySeparator}
            </FormLabel>
            <Tooltip
              title={context.lang.popup.localSetting.separatorTip}
              classes={{ tooltip: classes.noneSelect }}
            >
              <TextField
                className={classes.textField}
                classes={{ root: classes.codeFont }}
                value={state.keySeparator}
                onChange={(event) => handle.setKeySeparator(event.target.value)}
              />
            </Tooltip>
          </FormControl>
          {!state.showKey && <FormControl
            className={clsx(classes.formControl, classes.marginTop)}
          >
            <FormLabel className={classes.formLabel}>
              {context.lang.popup.localSetting.hiddenTag}
            </FormLabel>
            <TextField
              className={classes.textField}
              classes={{ root: classes.codeFont }}
              value={state.hiddenTag}
              onChange={(event) => handle.setHiddenTag(event.target.value)}
            />
          </FormControl>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handle.close} color="primary">
          {context.lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
