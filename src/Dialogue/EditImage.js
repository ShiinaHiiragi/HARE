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

export default function EditImage(props) {
  const classes = useStyles();
  const { open, state, handle } = props;
  const context = React.useContext(PanelContext);

  const applyUnitChange = () => {
    const valid = state.imageName.length && state.imageName.length <= maxNameLength;
    handle.setImageCheck(!valid);
    if (!valid) {
      handle.toggleMessageBox(context.lang.message.imageNameError, "warning");
      return;
    }
    context.request("POST/set/image", {
      unitID: state.unitID,
      pageID: state.pageID,
      imageID: state.imageID,
      imageName: state.imageName
    }).then(() => {
      handle.setImage((image) => image.map((item) => item.id === state.imageID
        ? { ...item, title: state.imageName } : item));
      handle.close();
    });
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <DialogTitle>{context.lang.popup.edit.titleImage}</DialogTitle>
      <DialogContent>
        <DialogContentText>{context.lang.popup.edit.textImage}</DialogContentText>
        <TextField
          fullWidth
          required
          label={context.lang.popup.edit.labelImage}
          error={state.imageCheck}
          value={state.imageName}
          onChange={(event) => handle.setImageName(event.target.value)}
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
