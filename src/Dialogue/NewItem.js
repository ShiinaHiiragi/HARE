import React from "react";
import clsx from "clsx";
import MonacoEditor from "react-monaco-editor";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import PackedMarkdown from "../Component/Markdown";
import cookie from "react-cookies";
import ExitConfirm from "./ExitConfirm";
import SubmitConfirm from "./SubmitConfirm";
import { PanelContext } from "../Page/Panel";
import { stringFormat, cookieTime, underline } from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  },
  container: {
    overflowY: "hidden"
  },
  bar: {
    position: "relative"
  },
  content: {
    padding: theme.spacing(4, 6),
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      overflowY: "scroll"
    },
    [theme.breakpoints.up("md")]: {
      maxHeight: "100%"
    }
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  itemField: {
    margin: theme.spacing(1, 0)
  },
  editorField: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      minHeight: "100vh",
      overflowY: "visible"
    },
    [theme.breakpoints.up("md")]: {
      flexGrow: 1,
      height: 0,
      overflowY: "visible"
    }
  },
  itemInput: {
    width: "20%",
    minWidth: 200
  },
  editorInput: {
    display: "flex",
    width: "100%",
    height: 0,
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      height: 0
    }
  },
  editorContainer: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "49%"
    },
    [theme.breakpoints.up("md")]: {
      width: "49%",
      height: "100%"
    }
  },
  editorPreview: {
    [theme.breakpoints.down("sm")]: {
      height: "49%",
      padding: theme.spacing(1, 4)
    },
    [theme.breakpoints.up("md")]: {
      height: "100%",
      padding: theme.spacing(1, 2)
    },
    overflowY: "auto"
  }
}));

export default function NewItem(props) {
  const classes = useStyles();
  const { open, state, handle } = props;
  const context = React.useContext(PanelContext);

  // the state of text input
  const [itemID, setItemID] = React.useState(0);
  const [query, setQuery] = React.useState("");
  const [key, setKey] = React.useState("");
  const [itemIDCheck, setItemIDCheck] = React.useState(false);
  const [wordWrap, setWordWrap] = React.useState("on");

  // the state of tab and dialogue
  const [tab, setTab] = React.useState(0);
  const [editKey, setEditKey] = React.useState(false);
  const [exit, setExit] = React.useState(false);
  const [apply, setApply] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      const savedWrap = cookie.load("__wordWrap");
      if (savedWrap) setWordWrap(savedWrap);
      else cookie.save("__wordWrap", "on", { expires: cookieTime(3650) });
      setItemID(state.listLength + 1);
    }
  }, [open, state.listLength]);
  const onEditorReady = (editor, monaco) => {
    let closureWordWrap = wordWrap;
    // editor.onDidChangeCursorPosition((event) => {
    //   console.log(event);
    // });
    editor.addAction({
      id: "wordWrap",
      label: "Word Wrap",
      keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KEY_Z],
      contextMenuGroupId: "1_modification",
      run: () => {
        if (closureWordWrap === "on") {
          setWordWrap("off");
          closureWordWrap = "off";
          cookie.save("__wordWrap", "off", { expires: cookieTime(3650) });
        } else {
          setWordWrap("on");
          closureWordWrap = "on";
          cookie.save("__wordWrap", "on", { expires: cookieTime(3650) });
        }
      }
    });
    editor.addAction({
      id: "underline",
      label: "Insert Underline",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_Q],
      contextMenuGroupId: "1_modification",
      run: (editor) => {
        const operation = {
          range: editor.getSelection(),
          text: underline,
          forceMoveMarkers: true
        };
        editor.executeEdits("underline", [operation]);
      }
    });
  };

  const tabChange = (_, index) => {
    if (index) setEditKey(true);
    setTab(index);
  };
  const idChange = (event) => {
    const valueJudge = event.target.value;
    setItemID((itemID) => {
      if (/^[0-9]*$/.test(valueJudge))
        return valueJudge;
      else return itemID;
    });
  };

  // the icon button of exit
  const toggleExit = () => {
    if (query !== "" || key !== "") setExit(true);
    else clearClose();
  };
  const clearClose = (clear) => {
    if (clear) {
      setQuery("");
      setKey("");
    }
    handle.close();
    setTab(0);
    setEditKey(false);
    setItemIDCheck(false);
  };

  // the text button of continue
  const toggleApply = () => {
    const targetNumber = Number(itemID) | 0;
    if (targetNumber <= 0 || targetNumber > state.listLength + 1) {
      setItemIDCheck(true);
      handle.toggleMessageBox(context.lang.message.invalidItemID, "warning");
      return;
    } else setItemIDCheck(false);
    if (!editKey) setApply(true);
    else submitNew();
  };

  const submitNew = () => {
    const targetItemID = Number(itemID) | 0;
    context.request("POST/set/new-item", {
      unitID: state.unitID,
      pageID: state.pageID,
      itemID: targetItemID,
      query: query,
      key: key
    }).then((createTime) => {
      handle.setItemList((itemList) => {
        let newItemList = itemList.map((item) =>
          item.id >= targetItemID ? { ...item, id: item.id + 1 } : item
        );
        newItemList.splice(targetItemID - 1, 0, {
          id: targetItemID,
          query: query,
          key: key,
          time: createTime
        });
        for (let index = 0; index < state.trackSize; index += 1)
          newItemList[targetItemID - 1][index + 1] = "L";
        return newItemList;
      });
      handle.setPageDetail((pageDetail) => ({
        ...pageDetail,
        itemSize: pageDetail.itemSize + 1
      }))
      clearClose(true);
    });
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={toggleExit}
      className={classes.noneSelect}
      classes={{ paper: classes.container }}
    >
      <AppBar className={classes.bar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleExit}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {state.editItem
              ? context.lang.popup.newItem.editTitle
              : context.lang.popup.newItem.title}
          </Typography>
          <IconButton color="inherit" onClick={toggleApply}>
            <DoneIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent className={classes.content}>
        <DialogContentText style={state.editItem ? {} : { margin: "0" }}>
          {state.editItem
            ? stringFormat(context.lang.popup.newItem.editText, [
              context.lang.popup.newItem.editTextZero[state.editItem],
              state.apiItemID
            ])
            : stringFormat(context.lang.popup.newItem.text, [
              state.listLength
                ? stringFormat(context.lang.popup.newItem.aboveOne, [
                    state.listLength + 1
                  ])
                : context.lang.popup.newItem.onlyOne,
              state.listLength ? context.lang.popup.newItem.supply : ""
            ])}
        </DialogContentText>
        {!state.editItem && <div className={classes.itemField}>
          <TextField
            required
            type="number"
            disabled={!state.listLength}
            error={itemIDCheck}
            value={itemID}
            onChange={idChange}
            label={context.lang.popup.newItem.itemID}
            className={classes.itemInput}
          />
        </div>}
        <Paper className={classes.editorField} variant="outlined" square>
          {!state.editItem && <Tabs
            value={tab}
            onChange={tabChange}
            variant="fullWidth"
            indicatorColor="primary"
          >
            <Tab label={context.lang.popup.newItem.query} />
            <Tab label={context.lang.popup.newItem.key} />
          </Tabs>}
          <div className={classes.editorInput}>
            <div className={classes.editorContainer}>
              <MonacoEditor
                width="100%"
                height="100%"
                language="markdown"
                value={tab ? key : query}
                onChange={tab ? setKey : setQuery}
                editorDidMount={onEditorReady}
                options={{
                  minimap: { enabled: false },
                  automaticLayout: true,
                  wordWrap: wordWrap
                }}
              />
            </div>
            <div style={{ width: "2%", height: "2%" }}></div>
            <Typography
              className={clsx(
                classes.editorContainer,
                classes.editorPreview,
                "markdown-body"
              )}
              component="div"
              variant="body2"
            >
              <PackedMarkdown children={tab ? key : query} />
            </Typography>
          </div>
        </Paper>
      </DialogContent>
      <ExitConfirm
        open={exit}
        handleClose={() => setExit(false)}
        handleClearClose={() => clearClose(true)}
      />
      <SubmitConfirm
        open={apply}
        handleClose={() => setApply(false)}
        handleSubmit={submitNew}
      />
    </Dialog>
  );
}
