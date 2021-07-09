import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { nameMaxLength } from "../Interface/Constant"
import { packedPOST } from "../Interface/Request";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function EditUnit(props) {
  const classes = useStyles();
  const { lang, open, userID, token, state, handle } = props;

  const applyUnitChange = () => {
    const targetSize = state.editUnitNameValue.length;
    if (targetSize === 0 || targetSize > nameMaxLength) {
      handle.setEditUnitNameCheck(true);
      handle.toggleMessageBox(lang.message.unitNameError, "warning");
    } else {
      packedPOST({
        uri: "/set/unit",
        query: {
          userID: userID,
          token: token,
          unitID: state.unitID,
          name: state.editUnitNameValue
        },
        msgbox: handle.toggleMessageBox,
        kick: handle.toggleKick,
        lang: lang
      }).then((out) => {
        console.log(out);
        handle.close();
      });
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <DialogTitle>{lang.popup.edit.titleUnit}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {lang.popup.edit.textUnit}
        </DialogContentText>
        <TextField
          fullWidth required
          label={lang.popup.edit.labelUnit}
          error={state.editUnitNameCheck}
          value={state.editUnitNameValue}
          onChange={(event) =>
            handle.setEditUnitNameValue(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={applyUnitChange} color="secondary">
          {lang.common.apply}
        </Button>
        <Button onClick={handle.close} color="primary">
          {lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
