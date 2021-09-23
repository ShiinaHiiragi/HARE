import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import FlipIcon from "@material-ui/icons/Flip";
import CloseIcon from "@material-ui/icons/Close";
import PackedMarkdown from "../Component/Markdown";
import ForwardTimer from "../Interface/Timer";
import { HotKeys } from "react-hotkeys";
import { PanelContext } from "../Page/Panel";
import { routeIndex, maxLog, autoQuery, autoKeys } from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none",
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      maxHeight: "100%",
    },
  },
  header: {
    margin: theme.spacing(2, 2, 1, 2),
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  main: {
    flexGrow: 1,
    height: 0,
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      width: "100%",
      padding: theme.spacing(1, 2, 2, 2),
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      margin: theme.spacing(1, 2, 2, 2),
    }
  },
  button: {
    borderRadius: 0
  },
  timer: {
    marginRight: theme.spacing(2)
  },
  sideBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "column"
    }
  },
  middleField: {
    display: "flex",
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      height: 0
    },
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(0, 2),
    }
  },
  middle: {
    flexGrow: 1,
    borderRadius: 0,
    padding: theme.spacing(2, 4),
    overflow: "auto",
    width: 0,
    [theme.breakpoints.up("sm")]: {
      height: "100%"
    }
  },
  iconButton: {
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(2, 0)
    } 
  }
}));

let log = [];
const keyMap = { 
  backToMenu: "esc",
  pure: "ctrl+c",
  fault: "ctrl+x",
  next: "right",
  previous: "left",
  switch: "ctrl+a",
  revoke: "ctrl+z"
};

export default function Recall(props) {
  const classes = useStyles();
  const { state, handle } = props;
  const context = React.useContext(PanelContext);
  const [pointer, setPointer] = React.useState(0);
  const [reverse, setReverse] = React.useState("query");

  React.useEffect(() => {
    if (state.route === routeIndex.recall) {
      log = [];
      setPointer(0);
      setReverse("query");
    }
  }, [state.route]);

  React.useEffect(() => {
    const unloadListener = (event) => {
      event.preventDefault();
      if (!state.recollect && state.route === routeIndex.recall
        && (state.recall.pure.length || state.recall.far.length)) {
        event.returnValue = context.lang.panel.recall.unload;
        return context.lang.panel.recall.unload;
      }
    };
    window.addEventListener("beforeunload", unloadListener);
    return () => window.removeEventListener("beforeunload", unloadListener);
  }, [state.recollect, state.route, state.recall, context.lang]);

  const switcher = () => {
    setReverse((reverse) => reverse === "query" ? "key" : "query");
  }

  const back = () => {
    handle.setCurrentRoute(state.prevRoute);
    handle.submitRecall(state.unitID, state.pageID);
  }

  const cancel = () => {
    if (!log.length) return;
    const lastType = log.pop();
    handle.setRecall((recall) => {
      const lastIndex = recall[lastType].pop();
      const lostIndex = recall.lost.findIndex((item, index, arr) =>
        item >= lastIndex && (!index || arr[index - 1] <= lastIndex));
      recall.lost.splice(lostIndex, 0, lastIndex);
      setPointer(lostIndex);
      return { ...recall, [lastType]: recall[lastType], lost: recall.lost };
    })
    setReverse("query");
  }

  const changeItem = (param) => {
    const type = typeof param;
    const size = state.recall.lost.length;
    if (type === "number")
      setPointer((pointer) => (pointer + param + size) % size);
    else if (type === "string") {
      log.push(param);
      // the length of log cannot exceed maxLog (may be 256)
      if (log.length > maxLog) log.shift();
      handle.setRecall((recall) => {
        const deleted = recall.lost.splice(pointer, 1);
        recall[param].push(deleted[0]);
        return { ...recall, [param]: recall[param], lost: recall.lost };
      })
      if (size === 1) {
        handle.setCurrentRoute(state.prevRoute);
        handle.submitRecall(state.unitID, state.pageID, true);
      }
      else setPointer((pointer) => pointer % (size - 1));
    }
    setReverse("query");
  }

  const keyHandler = {
    backToMenu: back,
    pure: () => changeItem("pure"),
    fault: () => changeItem("far"),
    next: () => changeItem(1),
    previous: () => changeItem(-1),
    switch: switcher,
    revoke: cancel
  };

  const processMarkdown = (index, reverse) => {
    const targetItem = state.itemList[index - 1];
    if (targetItem === undefined) return "";
    const { query, keys } = autoQuery(targetItem.query);
    if (reverse === "query" && !targetItem.key.length) return query;
    else if (reverse === "query") return targetItem.query;
    else if (targetItem.key.length) return targetItem.key;
    else return autoKeys(keys, context.lang);
  }

  return (
    <HotKeys keyMap={keyMap} handlers={keyHandler} className={classes.root}>
      <div className={classes.header}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          className={classes.button}
          onClick={back}
        >
          {context.lang.common.back}
        </Button>
        <div style={{ flexGrow: 1 }} />
        <Typography
          variant="subtitle2"
          color="textSecondary"
          className={classes.timer}
        >
          <ForwardTimer initialTime={state.timerInitial}/>
          {"　"}
          {pointer + 1} / {state.recall.lost.length}
        </Typography>
      </div>
      <div className={classes.main}>
        <div className={classes.sideBar}>
          <Tooltip
            title={context.lang.panel.recall.switch}
            classes={{ tooltip: classes.noneSelect }}
          >
            <IconButton
              className={classes.iconButton}
              onClick={switcher}
            >
              <CompareArrowsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={context.lang.panel.recall.previous}
            classes={{ tooltip: classes.noneSelect }}
          >
            <IconButton
              className={classes.iconButton}
              onClick={() => changeItem(-1)}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={context.lang.panel.recall.revoke}
            classes={{ tooltip: classes.noneSelect }}
          >
            <span>
              <IconButton
                className={classes.iconButton}
                disabled={!log.length}
                onClick={cancel}
              >
                <FlipIcon />
              </IconButton>
            </span>
          </Tooltip>
        </div>
        <div className={classes.middleField}>
          <Card className={classes.middle}>
            <Typography
              component="div"
              variant="body2"
              className="markdown-body"
            >
              <PackedMarkdown children={processMarkdown(state.recall.lost[pointer], reverse)} />
            </Typography>
          </Card>
        </div>
        <div className={classes.sideBar}>
          <Tooltip
            title={context.lang.panel.recall.pure}
            classes={{ tooltip: classes.noneSelect }}
          >
            <IconButton
              className={classes.iconButton}
              onClick={() => changeItem("pure")}
            >
              <RadioButtonUncheckedIcon  />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={context.lang.panel.recall.next}
            classes={{ tooltip: classes.noneSelect }}
          >
            <IconButton
              className={classes.iconButton}
              onClick={() => changeItem(1)}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={context.lang.panel.recall.far}
            classes={{ tooltip: classes.noneSelect }}
          >
            <IconButton
              className={classes.iconButton}
              onClick={() => changeItem("far")}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </HotKeys>
  );
}
