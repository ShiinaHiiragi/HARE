import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { stringFormat } from "../Interface/Constant";
import { palette } from "../Interface/Constant";
import KaTeX from "./KaTeX";
import katex from "katex";
import "katex/dist/katex.min.css";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  },
  bar: {
    position: "relative",
  },
  content: {
    padding: theme.spacing(4, 6),
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      overflowY: "scroll"
    },
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  textField: {
    margin: theme.spacing(0)
  },
  itemField: {
    width: "20%",
    minWidth: 200
  },
  quillField: {
    marginTop: theme.spacing(2),
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      minHeight: "100vh",
      overflowY: "visible"
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      flexGrow: 1,
    }
  },
  quillContainer: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "48%",
    },
    [theme.breakpoints.up("md")]: {
      width: "48%",
      height: "100%",
    },
  },
  quill: {
    fontFamily: "Roboto !important",
    height: "100%",
    width: "100%",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
    "& .ql-container": {
      fontFamily: "Roboto",
      flexGrow: 1,
      height: 0,
      width: "100%",
      overflowY: "auto",
      fontSize: "1rem"
    }
  }
}));

window.katex = katex;
const PackedQuill = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { lang, placeholder } = props;

  const [katex, setKatex] = React.useState(false);
  const [thisQuill, setThisQuill] = React.useState(null);
  function toggleKatex() {
    setThisQuill(this.quill);
    setKatex(true);
  }

  const modules = {
    toolbar: {
      container: [
        [{ "header": [1, 2, 3, 4, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code", "code-block", "formula", "image"],
        [
          { "align": [] },
          { "indent": "-1"},
          { "indent": "+1" },
          { "list": "ordered"},
          { "list": "bullet" }
        ],
        [{ "color": palette }, { "background": palette }, "clean"],
      ],
      handlers: {
        formula: toggleKatex
      }
    }
  };

  return (
    <div className={classes.quillContainer}>
      <ReactQuill
        theme="snow"
        ref={ref}
        modules={modules}
        className={classes.quill}
        placeholder={placeholder}
      />
      <KaTeX
        lang={lang}
        open={katex}
        quill={thisQuill}
        handleClose={() => setKatex(false)}
      />
    </div>
  );
});

export default function NewItem(props) {
  const classes = useStyles();
  const { lang, data, state, handle } = props;
  const queryRef = React.createRef();
  const keyRef = React.createRef();

  const submit = () => {
    console.log(queryRef.current.state);
    console.log(keyRef.current.state);
  }

  return (
    <Dialog
      fullScreen
      open={state.open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <AppBar className={classes.bar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handle.close}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {lang.popup.newItem.title}
          </Typography>
          <Button color="inherit" onClick={submit}>
            {lang.common.apply}
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent className={classes.content}>
        <DialogContentText className={classes.textField}>
          {stringFormat(lang.popup.newItem.text, [
            state.listLength
              ? stringFormat(lang.popup.newItem.aboveOne, [state.listLength + 1])
              : lang.popup.newItem.onlyOne
          ])}
        </DialogContentText>
        <TextField
          required
          type="number"
          label={lang.popup.newItem.itemID}
          className={classes.itemField}
        />
        <div className={classes.quillField}>
          <PackedQuill
            lang={lang}
            placeholder={lang.popup.newItem.query}
            ref={queryRef}
          />
          <div style={{ width: "4%", height: "4%" }} />
          <PackedQuill
            lang={lang}
            placeholder={lang.popup.newItem.key}
            ref={keyRef}
          />
        </div> 
      </DialogContent>
    </Dialog>
  );
}
