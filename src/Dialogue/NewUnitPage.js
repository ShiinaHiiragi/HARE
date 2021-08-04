import React from "react";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { PanelContext } from "../Page/Panel";
import { maxNameLength, maxPresentLength } from "../Interface/Constant";

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
  const { state, text, handle } = props;
  const context = React.useContext(PanelContext);

  const checkFormInput = () => {
    let errorMessage = "";
    const pagePresentLength = text.pagePresentValue.length;
    const pageNameLength = text.pageNameValue.length;
    const unitNameLength = text.unitNameValue.length;
    const pagePresentError = pagePresentLength > maxPresentLength;
    errorMessage = pagePresentError
      ? context.lang.message.pagePresentError
      : errorMessage;
    const pageNameError =
      pageNameLength === 0 || pageNameLength > maxNameLength;
    errorMessage = pageNameError ? context.lang.message.pageNameError : errorMessage;
    const unitNameError =
      unitNameLength === 0 || unitNameLength > maxNameLength;
    if (state.group)
      errorMessage = unitNameError ? context.lang.message.unitNameError : errorMessage;
    handle.setUnitNameCheck(unitNameError);
    handle.setPageNameCheck(pageNameError);
    handle.setPagePresentCheck(pagePresentError);
    return errorMessage;
  };

  const submitEdit = () => {
    const errorMessage = checkFormInput();
    if (errorMessage !== "") {
      handle.toggleMessageBox(errorMessage, "warning");
      return;
    }
    context.request("POST/set/page", {
      unitID: state.type[0],
      pageID: state.type[1],
      pageName: text.pageNameValue,
      pagePresent: text.pagePresentValue
    }).then(() => {
      handle.setListObject((listObject) =>
        listObject.map((item) => item.unitID === state.type[0]
          ? {
            ...item,
            pages: item.pages.map((subItem) => subItem.pageID === state.type[1]
              ? {
                ...subItem,
                pageName: text.pageNameValue,
                pagePresent: text.pagePresentValue
              } : subItem)
          } : item)
      );
      handle.close();
    })
  };

  const submitNew = () => {
    const errorMessage = checkFormInput();
    if (errorMessage !== "") {
      handle.toggleMessageBox(errorMessage, "warning");
      return;
    }
    const preParams = {
      unitID: state.type[0] ?? state.type,
      pageName: text.pageNameValue,
      pagePresent: text.pagePresentValue
    };
    context.request("POST/new/up", state.group
      ? { ...preParams, unitName: text.unitNameValue }
      : { ...preParams, pageID: state.type[1] }
    ).then(() => {
      handle.close();
      if (state.group) {
        let tempListObject = state.listObject.map((item) =>
          item.unitID >= state.type ? { ...item, unitID: item.unitID + 1 } : item
        );
        tempListObject.splice((state.type || 1) - 1, 0, {
          unitID: state.type || 1,
          unitName: text.unitNameValue,
          open: true,
          selected: false,
          pages: [
            {
              seleted: false,
              route: 1,
              pageID: 1,
              pageName: text.pageNameValue,
              pageCover: 0,
              pagePresent: text.pagePresentValue
            }
          ]
        });
        handle.setListObject(tempListObject);
      } else {
        let tempPageObject = state.listObject[state.type[0] - 1].pages.map((item) =>
          item.pageID >= state.type[1] ? { ...item, pageID: item.pageID + 1 } : item
        );
        tempPageObject.splice(state.type[1] - 1, 0, {
          seleted: false,
          route: 1,
          pageID: state.type[1],
          pageName: text.pageNameValue,
          pageCover: 0,
          pagePresent: text.pagePresentValue
        });
        handle.setListObject((listObject) =>
          listObject.map((item) =>
            item.unitID === state.type[0]
              ? {
                  ...item,
                  pages: tempPageObject
                }
              : item
          )
        );
      }
    });
  };

  return (
    <Dialog
      fullWidth
      open={state.open}
      onClose={handle.close}
      className={classes.noneSelect}
    >
      <DialogTitle>
        {state.edit
          ? context.lang.popup.edit.titlePage
          : state.group
          ? context.lang.popup.newUnitPage.titleUnit
          : context.lang.popup.newUnitPage.titlePage}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {state.edit
            ? context.lang.popup.edit.textPage
            : state.group
            ? context.lang.popup.newUnitPage.textUnit
            : context.lang.popup.newUnitPage.textPage}
        </DialogContentText>
        <div>
          {state.group && (
            <TextField
              required
              label={context.lang.popup.newUnitPage.unitName}
              className={clsx(classes.textInputHalf, classes.margin)}
              error={text.unitNameCheck}
              value={text.unitNameValue}
              onChange={(event) => handle.setUnitNameValue(event.target.value)}
              autoFocus={state.group}
            />
          )}
          <TextField
            required
            label={state.edit ? context.lang.popup.edit.labelPageName : context.lang.popup.newUnitPage.pageName}
            className={classes.textInputHalf}
            error={text.pageNameCheck}
            value={text.pageNameValue}
            onChange={(event) => handle.setPageNameValue(event.target.value)}
            autoFocus={!state.group}
          />
        </div>
        <TextField
          multiline
          rows={4}
          label={state.edit ? context.lang.popup.edit.labelPagePresent : context.lang.popup.newUnitPage.pagePresent}
          className={classes.textInput}
          error={text.pagePresentCheck}
          value={text.pagePresentValue}
          onChange={(event) => handle.setPagePresentValue(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (state.edit) submitEdit();
            else submitNew();
          }}
          color="secondary"
        >
          {context.lang.common.apply}
        </Button>
        <Button onClick={handle.close} color="primary">
          {context.lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
