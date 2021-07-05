import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import cookie from "react-cookies";
import SignTitle from "../Component/SignTitle";
import SignInForm from "../Component/Form";
import Copyright from "../Component/Copyright";
import { languagePicker } from "../Language/Lang";
import MessageBox from "../Dialogue/MessageBox";
import Load from "../Dialogue/Load";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    userSelect: "none"
  },
  image: {
    backgroundImage: `url(${requestURL}/src/cover)`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const isDevMode = window.location.port === "3000";
const requestURL = isDevMode ? "http://localhost:8000" : "";

export default function SignIn() {
  const classes = useStyles();

  // detect if the language information is stored
  let storageLang = cookie.load("lang");
  if (storageLang === undefined) {
    cookie.save("lang", "en", {
      expires: new Date(new Date().getTime() + 10 * 365 * 24 * 3600 * 1000)
    });
    storageLang = "en";
  }
  const [globalLang, setGlobalLang] = React.useState(
    languagePicker(storageLang)
  );
  const changeGlobalLang = (targetValue) => {
    if (targetValue) setGlobalLang(languagePicker(targetValue));
    cookie.save("lang", targetValue, {
      expires: new Date(new Date().getTime() + 10 * 365 * 24 * 3600 * 1000)
    });
  };

  // the setting of snackbar
  const [messageBoxInfo, setMessageBoxInfo] = React.useState({
    open: false,
    type: "success",
    message: ""
  });
  const toggleMessageBox = (message, type) => {
    setMessageBoxInfo({
      open: true,
      type: type,
      message: message
    });
  };
  const closeMessageBox = () => {
    setMessageBoxInfo((snackbarInfo) => ({
      ...snackbarInfo,
      open: false
    }));
  };

  // the state of loading scene
  let clockLoading = null;
  const [loading, setLoading] = React.useState(false);
  const toggleLoading = () =>
    (clockLoading = setTimeout(() => {
      clockLoading = null;
      setLoading(true);
    }, 1000));
  const closeLoading = () => {
    if (clockLoading) clearTimeout(clockLoading);
    setLoading(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <SignTitle lang={globalLang} />
          <SignInForm
            lang={globalLang}
            handle={{
              toggleMessageBox: toggleMessageBox,
              changeLang: changeGlobalLang,
              toggleLoading: toggleLoading,
              closeLoading: closeLoading
            }}
            URL={requestURL}
          />
          <Copyright lang={globalLang} />
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <MessageBox
        open={messageBoxInfo.open}
        handleClose={closeMessageBox}
        messageBoxType={messageBoxInfo.type}
        messageBoxMessage={messageBoxInfo.message}
      />
      <Load open={loading} />
    </Grid>
  );
}
