import React from "react";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
    margin: theme.spacing(1, 0),
  },
  editorField: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      minHeight: "100vh",
      overflowY: "visible"
    },
    [theme.breakpoints.up("md")]: {
      flexGrow: 1
    }
  },
  itemInput: {
    width: "20%",
    minWidth: 200
  },
  editorInput: {
    display: "flex",
    flexGrow: "1",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    }
  }
}));

export default function NewItem(props) {
  const classes = useStyles();
  const { lang, data, state, handle } = props;
  const [itemID, setItemID] = React.useState(0);
  const [tab, setTab] = React.useState(0);
  React.useEffect(() => {
    if (state.open)
      setItemID(state.listLength + 1);
  }, [state.open]);

  const clearClose = () => {
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
        <div className={classes.itemField}>
          <TextField
            required
            type="number"
            disabled={!state.listLength}
            value={itemID}
            onChange={(event) => setItemID(event.target.value)}
            label={lang.popup.newItem.itemID}
            className={classes.itemInput}
          />
        </div>
        <Paper
          className={classes.editorField}
          variant="outlined"
          square
        >
          <Tabs
            value={tab}
            onChange={(_, index) => setTab(index)}
            variant="fullWidth"
            indicatorColor="primary"
          >
            <Tab label="Q" />
            <Tab label="A" />
          </Tabs>
          <div className={classes.editorInput}>

          </div>
        </Paper>
      </DialogContent>
    </Dialog>
  );
}
