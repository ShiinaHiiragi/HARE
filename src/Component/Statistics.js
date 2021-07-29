import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import Accuracy from "./Accuracy";
import { routeIndex } from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },  
  buttonPanel: {
    margin: theme.spacing(2, 2, 1, 2),
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  rankingPanel: {
    borderRadius: 0,
    margin: theme.spacing(1, 2, 2, 2),
    padding: theme.spacing(2, 4),
    display: "flex",
    flexDirection: "row",
    overflow: "visible"
  },
  textField: {
    flexGrow: 1,
    padding: theme.spacing(2)
  }
}));

export default function Statistics(props) {
  const classes = useStyles();
  const { lang, data, handle } = props;
  const [anime, setAnime] = React.useState(0);
  React.useEffect(() => {
    if (data.current.route === routeIndex.stat)
      setAnime(Math.random());
  }, [data.current.route === routeIndex.stat]);

  return (
    <div className={classes.root}>
      <div className={classes.buttonPanel}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackOutlinedIcon />}
          className={classes.button}
          onClick={() => handle.setCurrentRoute(routeIndex.cover)}
          style={{ borderRadius: 0 }}
        >
          {lang.common.back}
        </Button>
      </div>
      {data.statInfo.map((item) => (
        <Card className={classes.rankingPanel}>
          <Accuracy key={anime} value={(item.pure / data.pageDetail.itemSize) * 100} />
          <div className={classes.textField}>
            {JSON.stringify(item)}
          </div>
        </Card>
      ))}
    </div>
  );
}
