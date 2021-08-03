import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import { PanelContext } from "../Page/Panel";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  },
  title: {
    paddingBottom: theme.spacing(0)
  },
  icons: {
    display: "flex",
    justifyContent: "center"
  }
}));

export default function ChangeTrack(props) {
  const classes = useStyles();
  const { open, state, handle } = props;
  const context = React.useContext(PanelContext);

  const submit = (targetValue) => {
    if (state.value !== targetValue) {
      context.request("POST/set/track", {
        unitID: state.unitID,
        pageID: state.pageID,
        itemID: state.itemID,
        trackID: state.trackID,
        value: targetValue
      }).then(() => {
        handle.setItemList((itemList) => itemList.map((item) => ({
          ...item,
          [state.trackID]: item.id === state.itemID
            ? targetValue
            : item[state.trackID]
        })));
      });
    }
    handle.close();
  }

  return (
    <Dialog
      open={open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <DialogTitle className={classes.title}>{context.lang.popup.edit.track}</DialogTitle>
      <DialogContent className={classes.icons}>
        <IconButton disabled={state.value === "P"} onClick={() => submit("P")}>
          <RadioButtonUncheckedIcon />
        </IconButton>
        <IconButton disabled={state.value === "F"} onClick={() => submit("F")}>
          <CloseIcon />
        </IconButton>
        <IconButton disabled={state.value === "L"} onClick={() => submit("L")}>
          <ChangeHistoryIcon />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
}
