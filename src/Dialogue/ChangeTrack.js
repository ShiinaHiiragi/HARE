import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  },
  title: {
    paddingBottom: theme.spacing(0)
  },
  icons: {
    display: "flex",
    justifyContent: "center"
  }
}));

export default function ChangeTrack(props) {
  const classes = useStyles();
  const { lang, open, data, handle } = props;
  const submit = (targetValue) => {
    if (data.value !== targetValue) {

    }
    handle.close();
  }

  return (
    <Dialog
      open={open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <DialogTitle className={classes.title}>{lang.popup.edit.track}</DialogTitle>
      <DialogContent className={classes.icons}>
        <IconButton disabled={data.value === "P"} onClick={() => submit("P")}>
          <RadioButtonUncheckedIcon />
        </IconButton>
        <IconButton disabled={data.value === "F"} onClick={() => submit("F")}>
          <CloseIcon />
        </IconButton>
        <IconButton disabled={data.value === "L"} onClick={() => submit("L")}>
          <ChangeHistoryIcon />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
}
