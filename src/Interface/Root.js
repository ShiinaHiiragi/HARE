import React from "react";
import { HotKeys } from "react-hotkeys";
import Shortcut from "../Dialogue/Shortcut";
import Volumn from "../Dialogue/Volumn";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%"
  }
}));

const keyMap = {
  help: "shift+/",
  volumn: "shift+1"
};

export default function Root(props) {
  const { children } = props;
  const classes = useStyles();
  const [shortcut, setShortcut] = React.useState(false);
  const [volumn, setVolumn] = React.useState(false);
  const keyHandler = {
    help: () => setShortcut(true),
    volumn: () => setVolumn(true)
  };

  return (
    <HotKeys keyMap={keyMap} handlers={keyHandler} className={classes.root}>
      {children}
      <Shortcut
        open={shortcut}
        handleClose={() => setShortcut(false)}
      />
      <Volumn
        open={volumn}
        handleClose={() => setVolumn(false)}
      />
    </HotKeys>
  );
}
