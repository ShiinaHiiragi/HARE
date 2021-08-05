import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { PanelContext } from "../Page/Panel";
import { stringFormat } from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function Move(props) {
  const classes = useStyles();
  const { open, state, handle } = props;
  const context = React.useContext(PanelContext);

  const [value, setValue] = React.useState(0);
  const [check, setCheck] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setValue(state.select);
      setCheck(false);
    }
  }, [open, state.select]);

  const submit = () => {
    const src = state.select;
    const dst = Number(value) | 0;
    if (dst < 1 || dst > state.listLength) {
      handle.toggleMessageBox(context.lang.message.invalidItemID, "warning");
      return;
    }
    if (src !== dst)
      context.request("POST/set/move", {
        unitID: state.unitID,
        pageID: state.pageID,
        src: src,
        dst: dst
      }).then(() => {
        handle.setItemList((itemList) => {
          const direction = src < dst ? -1 : 1;
          const left = direction < 0 ? src + 1 : dst;
          const right = direction < 0 ? dst : src - 1;
          let toChange = itemList.map((item) => item);
          let deleted = toChange.splice(src - 1, 1);
          toChange.splice(dst - 1, 0, deleted[0]);
          return toChange.map((item) => item.id === src
            ? { ...item, id: dst }
            : (item.id >= left && item.id <= right)
            ? { ...item, id: item.id + direction }
            : item);
        });
        handle.close();
      });
  };

  const changeInput = (event) => {
    const valueJudge = event.target.value;
    setValue((value) => {
      if (/^[0-9]*$/.test(valueJudge))
        return valueJudge;
      else return value;
    });
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <DialogTitle>{context.lang.popup.edit.titleMove}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {stringFormat(context.lang.popup.edit.textMove, [state.listLength])}
        </DialogContentText>
        <TextField
          fullWidth
          required
          autoFocus
          type="number"
          label={context.lang.popup.edit.labelMove}
          error={check}
          value={value}
          onChange={changeInput}
        />
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
