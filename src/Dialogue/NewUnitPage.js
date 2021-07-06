import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: { userSelect: "none" },
  margin: { marginRight: "5%" },
  textInputHalf: { width: "45%" },
  textInput: { width: "95%" }
}));

export default function NewUnitPage(props) {
  const classes = useStyles();
  const { lang, open, group, type, handleClose } = props;

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle>
        {
          group
            ? lang.popup.newUnitPage.titleUnit
            : lang.popup.newUnitPage.titlePage
        }
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {
            group
              ? lang.popup.newUnitPage.textUnit
              : lang.popup.newUnitPage.textPage
          }
        </DialogContentText>
        {/* TODO: change to chinese later */}
        <div>
          <TextField
            label={lang.popup.newUnitPage.unitName}
            className={clsx(classes.textInputHalf, classes.margin)}
            // value={}
            // onChange={}
          />
          <TextField
            label={lang.popup.newUnitPage.pageName}
            className={classes.textInputHalf}
            // value={}
            // onChange={}
          />
        </div>
        <TextField
          multiline rows={4}
          label={lang.popup.newUnitPage.pagePresent}
          className={classes.textInput}
          // value={}
          // onChange={}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          {lang.common.ok}
        </Button>
        <Button onClick={handleClose} color="primary">
          {lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
