import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Title from "../Component/Title";
import SignInForm from "../Component/Form";
import Copyright from "../Component/Copyright";
import { languagePicker } from "../Language/Lang";
import LanguageSelector from "../Dialogue/LanguageSelector";

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
  let storageLang = localStorage.getItem("lang");
  if (storageLang === undefined) {
    localStorage.setItem("lang", "en");
    storageLang = "en";
  }
  const [displayLang, setDisplayLang] = React.useState({
    languageObject: languagePicker(storageLang),
    languageDialogueOpen: false,
  });
  const toggleLanguageDialogue = () => {
    setDisplayLang(displayLang => ({
      ...displayLang,
      languageDialogueOpen: true
    }));
  };
  const closeLanguageDialogue = (targetValue) => {
    setDisplayLang(displayLang => ({
      ...displayLang,
      languageDialogueOpen: false,
      languageObject: targetValue
        ? languagePicker(targetValue)
        : displayLang.languageObject
    }));
    if (targetValue) {
      localStorage.setItem("lang", targetValue);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Title lang={displayLang.languageObject} />
          <SignInForm
            lang={displayLang.languageObject}
            handleToggle={{toggleLanguage: toggleLanguageDialogue}}
          />
          <Copyright lang={displayLang.languageObject} />
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <LanguageSelector
        lang={displayLang.languageObject}
        open={displayLang.languageDialogueOpen}
        handleClose={closeLanguageDialogue}
      />
    </Grid>
  );
}
