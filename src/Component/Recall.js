import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import FlipIcon from "@material-ui/icons/Flip";
import CloseIcon from "@material-ui/icons/Close";
import { HotKeys } from "react-hotkeys";

import makeStyles from "@material-ui/core/styles/makeStyles";
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
  const { lang, handle } = props;
  const keyHandler = { };

  return (
    <HotKeys keyMap={keyMap} handlers={keyHandler} className={classes.root}>
      <div className={classes.header}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          className={classes.button}
          onClick={() => handle.setCurrentRoute(1)}
        >
          {lang.common.back}
        </Button>
      </div>
      <div className={classes.main}>
        <div className={classes.sideBar}>
          <IconButton className={classes.iconButton}>
            <CompareArrowsIcon />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <FlipIcon />
          </IconButton>
        </div>
        <Card className={classes.middle}> MARKDOWN </Card>
        <div className={classes.sideBar}>
          <IconButton className={classes.iconButton}>
            <RadioButtonUncheckedIcon  />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <ArrowForwardIcon />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </HotKeys>
  );
}
