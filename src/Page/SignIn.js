import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Title from "../Component/Title";
import SignInForm from "../Component/Form";
import Copyright from "../Component/Copyright";
import languageSelector from "../Language/Lang";

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
  const currentLanguage = languageSelector("zh-CN");

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Title />
          <SignInForm />
          <Copyright />
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}
