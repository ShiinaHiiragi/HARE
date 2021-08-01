import React from "react";
import { HotKeys } from "react-hotkeys";
import Shortcut from "../Dialogue/Shortcut";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%"
  }
}));

const keyMap = {
  help: "shift+/"
};

export default function Root(props) {
  const { lang, children } = props;
  const classes = useStyles();
  const [shortcut, setShortcut] = React.useState(false);
  const keyHandler = {
    help: () => setShortcut(true)
  };

  return (
    <HotKeys keyMap={keyMap} handlers={keyHandler} className={classes.root}>
      {children}
      <Shortcut
        lang={lang}
        open={shortcut}
        handleClose={() => setShortcut(false)}
      />
    </HotKeys>
  );
}
