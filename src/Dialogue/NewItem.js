import React from "react";
import BraftEditor from "braft-editor";
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
import "braft-editor/dist/index.css";

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
  editorField: {
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
  editorContainer: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "48%",
    },
    [theme.breakpoints.up("md")]: {
      width: "48%",
      height: "100%",
    },
  },
  editor: {
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
      fontSize: "1rem",
      "& .ql-editor.ql-blank::before": {
        fontStyle: "normal"
      }
    },
  }
}));

export default function NewItem(props) {
  const classes = useStyles();
  const { lang, data, state, handle } = props;
  const [itemID, setItemID] = React.useState(0);
  const [query, setQuery] = React.useState(BraftEditor.createEditorState(null));
  const [key, setKey] = React.useState(BraftEditor.createEditorState(null));
  React.useEffect(() => {
    if (state.open)
      setItemID(state.listLength + 1);
  }, [state.open]);

  const clearClose = () => {
    setQuery(BraftEditor.createEditorState(null));
    setKey(BraftEditor.createEditorState(null));
    handle.close();
  }
  const submit = () => {
    // TODO: fill this
  }

  return (
    <Dialog
      fullScreen
      open={state.open}
      onClose={clearClose}
      className={classes.noneSelect}
    >
      <AppBar className={classes.bar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={clearClose}>
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
              : lang.popup.newItem.onlyOne,
            state.listLength ? lang.popup.newItem.supply : "",
          ])}
        </DialogContentText>
        <TextField
          required
          type="number"
          disabled={!state.listLength}
          value={itemID}
          onChange={(event) => setItemID(event.target.value)}
          label={lang.popup.newItem.itemID}
          className={classes.itemField}
        />
        <div className={classes.editorField}>
          <BraftEditor
            className={classes.editor}
            value={query}
            onChange={setQuery}
          />
          <BraftEditor
            className={classes.editor}
            value={key}
            onChange={setKey}
          />
        </div> 
      </DialogContent>
    </Dialog>
  );
}
