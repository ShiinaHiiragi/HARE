import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardField: {
    flexGrow: 1,
    borderRadius: "0",
    margin: theme.spacing(2, 2, 2, 2),
    padding: theme.spacing(2, 4),
    display: "flex",
    flexDirection: "column"
  },
  buttonPanel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  grid: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
  },
  button: {
    borderRadius: 0
  }
}));

export default function View(props) {
  const classes = useStyles();
  const { lang, current, data, handle } = props;

  React.useEffect(() => {
    if (current.route === 2) {
      // fetch item info
    }
  }, [current]);

  return (
    <div className={classes.root}>
      <Card className={classes.cardField}>
        <div className={classes.buttonPanel}>
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
        <div className={classes.grid}>
          HAHAHA
        </div>
      </Card>
    </div>
  );
}
