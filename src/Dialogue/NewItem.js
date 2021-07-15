import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { stringFormat } from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function NewItem(props) {
  const classes = useStyles();
  const { lang, data, state, handle } = props;
  const ref = React.createRef();

  return (
    <Dialog
      fullWidth
      open={state.open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <DialogTitle> {lang.popup.newItem.title} </DialogTitle>
      <DialogContent ref={ref}>
        <DialogContentText>
          {stringFormat(lang.popup.newItem.text, [
            state.listLength
              ? stringFormat(lang.popup.newItem.aboveOne, [state.listLength + 1])
              : lang.popup.newItem.onlyOne
          ])}
        </DialogContentText>
        <ReactQuill
          theme="snow"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          console.log(ref.current.getElementsByClassName("ql-editor")[0].innerHTML);
        }} color="secondary">
          {lang.common.apply}
        </Button>
        <Button onClick={handle.close} color="primary">
          {lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
