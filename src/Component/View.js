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
  buttonField: {
    margin: theme.spacing(2, 2, 1, 2),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardField: {
    flexGrow: 1,
    borderRadius: "0",
    margin: theme.spacing(1, 2, 2, 2),
    padding: theme.spacing(2, 4),
    display: "flex",
    flexDirection: "column"
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

  return (
    <div className={classes.root}>
      <div className={classes.buttonField}>
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
      <Card className={classes.cardField}>
        {JSON.stringify(data.itemList)}
      </Card>
    </div>
  );
}
