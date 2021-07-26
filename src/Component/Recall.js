import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import FlipIcon from "@material-ui/icons/Flip";
import CloseIcon from "@material-ui/icons/Close";
import PackedMarkdown from "../Component/Markdown";
import { HotKeys } from "react-hotkeys";
import { routeIndex } from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { ParameterDescriptionMessage } from "pg-protocol/dist/messages";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
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
    margin: theme.spacing(1, 2, 2, 2),
    display: "flex",
    flexDirection: "row"
  },
  button: {
    borderRadius: 0
  },
  sideBar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  middle: {
    flexGrow: 1,
    borderRadius: 0,
    width: 0,
    overflow: "auto",
    margin: theme.spacing(0, 2),
    padding: theme.spacing(2, 4)
  },
  iconButton: {
    margin: theme.spacing(2, 0)
  }
}));

const keyMap = { };

export default function Recall(props) {
  const classes = useStyles();
  const { lang, data, handle } = props;
  const keyHandler = { };
 
  const [log, setLog] = React.useState([]);
  const [pointer, setPointer] = React.useState(0);
  const [reverse, setReverse] = React.useState("query");
  React.useEffect(() => {
    if (data.route === routeIndex.recall) {
      setPointer(0);
      setReverse("query");
    }
  }, [data.route]);

  const changeItem = (param) => {
    const type = typeof param;
    const size = data.recall.lost.length;
    if (type === "number") {
      setReverse("query");
      setPointer((pointer) => (pointer + param + size) % size);
    }
    else if (type === "string") {
      handle.setRecall((recall) => {
        const deleted = recall.lost.splice(pointer, 1);
        recall[param].splice(0, 0, deleted[0]);
        return { ...recall, [param]: recall[param], lost: recall.lost };
      })
      setReverse("query");
      setPointer((pointer) => pointer % (size - 1));
      if (size === 1) handle.setCurrentRoute(routeIndex.rank);
    }
  }

  return (
    <HotKeys keyMap={keyMap} handlers={keyHandler} className={classes.root}>
      <div className={classes.header}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          className={classes.button}
          onClick={() => handle.setCurrentRoute(routeIndex.cover)}
        >
          {lang.common.back}
        </Button>
      </div>
      <div className={classes.main}>
        <div className={classes.sideBar}>
          <IconButton
            className={classes.iconButton}
            onClick={() => setReverse((reverse) => reverse === "query" ? "key" : "query")}
          >
            <CompareArrowsIcon />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            onClick={() => changeItem(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton className={classes.iconButton} disabled={!log.length}>
            <FlipIcon />
          </IconButton>
        </div>
        <Card className={classes.middle}>
          <Typography
            component="div"
            variant="body2"
          >
            <PackedMarkdown children={data.itemList[data.recall.lost[pointer] - 1]?.[reverse]} />
          </Typography>
        </Card>
        <div className={classes.sideBar}>
          <IconButton
            className={classes.iconButton}
            onClick={() => changeItem("pure")}
          >
            <RadioButtonUncheckedIcon  />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            onClick={() => changeItem(1)}
          >
            <ArrowForwardIcon />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            onClick={() => changeItem("far")}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </HotKeys>
  );
}
