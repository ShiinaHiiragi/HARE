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
  },
  quillContainer: {
    width: "100%",
    height: "200px"
  }
}));

const PackedQuill = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const modules = {
    toolbar: [
      [{ "header": [1, 2, false] }],
      ["bold", "italic", "underline","strike", "blockquote"],
      [{"list": "ordered"}, {"list": "bullet"}, {"indent": "-1"}, {"indent": "+1"}],
      ["link", "image"],
      ["clean"]
    ],
  };

  const formats = [
    "header",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent",
    "link", "image"
  ]

  return (
    <div className={classes.quillContainer}>
      <ReactQuill
        theme="snow"
        ref={ref}
        modules={modules}
        formats={formats}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});

export default function NewItem(props) {
  const classes = useStyles();
  const { lang, data, state, handle } = props;
  const queryRef = React.createRef();

  return (
    <Dialog
      fullWidth
      // TODO: make fullScreen pretty
      fullScreen
      open={state.open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <DialogTitle> {lang.popup.newItem.title} </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {stringFormat(lang.popup.newItem.text, [
            state.listLength
              ? stringFormat(lang.popup.newItem.aboveOne, [state.listLength + 1])
              : lang.popup.newItem.onlyOne
          ])}
        </DialogContentText>
        <PackedQuill ref={queryRef} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          console.log(queryRef.current.state);
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
