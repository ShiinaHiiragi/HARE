import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { maxNameLength } from "../Interface/Constant";
import { PanelContext } from "../Page/Panel";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function Password(props) {
  const classes = useStyles();
  const { open, state, handle } = props;
  const context = React.useContext(PanelContext);

  const applyUnitChange = () => {
    const targetSize = state.editUnitNameValue.length;
    if (targetSize === 0 || targetSize > maxNameLength) {
      handle.setEditUnitNameCheck(true);
      handle.toggleMessageBox(context.lang.message.unitNameError, "warning");
    } else {
      context.request("POST/set/unit", {
        unitID: state.unitID,
        unitName: state.editUnitNameValue
      }).then(() => {
        handle.setListObject((listObject) =>
          listObject.map((item) =>
            item.unitID === state.unitID
              ? { ...item, unitName: state.editUnitNameValue }
              : item
          )
        );
        handle.close();
      });
    }
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <DialogTitle>{context.lang.popup.edit.titleUnit}</DialogTitle>
      <DialogContent>
        <DialogContentText>{context.lang.popup.edit.textUnit}</DialogContentText>
        <TextField
          fullWidth
          required
          label={context.lang.popup.edit.labelUnit}
          error={state.editUnitNameCheck}
          value={state.editUnitNameValue}
          onChange={(event) => handle.setEditUnitNameValue(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={applyUnitChange} color="secondary">
          {context.lang.common.apply}
        </Button>
        <Button onClick={handle.close} color="primary">
          {context.lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
