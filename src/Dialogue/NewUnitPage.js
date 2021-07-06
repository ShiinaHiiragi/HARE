import React from "react";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { packedPOST } from "../Interface/Request";
import { nameMaxLength, presentMaxLength } from "../Interface/Constant"

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: { userSelect: "none" },
  margin: { marginRight: "8%" },
  textInputHalf: { width: "44%" },
  textInput: {
    width: "96%",
    marginTop: theme.spacing(2)
  }
}));

export default function NewUnitPage(props) {
  const classes = useStyles();
  const { lang, userID, token, open, group, type, text, handle } = props;

  const checkFormInput = () => {
    let errorMessage = "";
    const pagePresentLength = text.pagePresentValue.length;
    const pageNameLength = text.pageNameValue.length;
    const unitNameLength = text.unitNameValue.length;
    const pagePresentError = pagePresentLength > presentMaxLength;
    errorMessage = pagePresentError ? lang.message.pagePresentError : errorMessage;
    const pageNameError = pageNameLength === 0 || pageNameLength > nameMaxLength;
    errorMessage = pageNameError ? lang.message.pageNameError : errorMessage;
    const unitNameError = unitNameLength === 0 || unitNameLength > nameMaxLength;
    errorMessage = unitNameError ? lang.message.unitNameError : errorMessage;
    handle.setUnitNameCheck(unitNameError);
    handle.setPageNameCheck(pageNameError);
    handle.setPagePresentCheck(pagePresentError);
    return errorMessage;
  }

  const submit = () => {
    const errorMessage = checkFormInput();
    if (errorMessage !== "")
      handle.toggleMessageBox(errorMessage, "warning");
    else {
      packedPOST({
        uri: "/set/new-up",
        query: {
          userID: userID,
          token: token,
          unitName: text.unitNameValue,
          pageName: text.pageNameValue,
          pagePresent: text.pagePresentValue
        },
        msgbox: handle.toggleMessageBox,
        lang: lang
      }).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handle.close}
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
        <div>
          {group && (<TextField
            required
            label={lang.popup.newUnitPage.unitName}
            className={clsx(classes.textInputHalf, classes.margin)}
            error={text.unitNameCheck}
            value={text.unitNameValue}
            onChange={(event) => handle.setUnitNameValue(event.target.value)}
            autoFocus
          />)}
          <TextField
            required
            label={lang.popup.newUnitPage.pageName}
            className={classes.textInputHalf}
            error={text.pageNameCheck}
            value={text.pageNameValue}
            onChange={(event) => handle.setPageNameValue(event.target.value)}
          />
        </div>
        <TextField
          multiline rows={4}
          label={lang.popup.newUnitPage.pagePresent}
          className={classes.textInput}
          error={text.pagePresentCheck}
          value={text.pagePresentValue}
          onChange={(event) => handle.setPagePresentValue(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={submit} color="secondary">
          {lang.common.ok}
        </Button>
        <Button onClick={handle.close} color="primary">
          {lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
