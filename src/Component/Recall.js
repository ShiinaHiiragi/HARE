import Button from "@material-ui/core/Button";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
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
          startIcon={<ArrowBackOutlinedIcon />}
          className={classes.button}
          onClick={() => handle.setCurrentRoute(1)}
        >
          {lang.common.back}
        </Button>
      </div>
      <div className={classes.main}>
        234
      </div>
    </HotKeys>
  );
}
