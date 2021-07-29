import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import Accuracy from "./Accuracy";
import { stringFormat, timeFormat, routeIndex } from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
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
    overflow: "visible",
    alignItems: "center"
  },
  textField: {
    flexGrow: 1,
    padding: theme.spacing(2, 2, 2, 4)
  }
}));

export default function Statistics(props) {
  const classes = useStyles();
  const { lang, data, handle } = props;
  const [anime, setAnime] = React.useState(0);
  React.useEffect(() => {
    if (data.current.route === routeIndex.stat) setAnime(Math.random());
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
      {data.statInfo.map((item, index) => (
        <Card className={classes.rankingPanel} key={index}>
          <Accuracy
            key={anime}
            value={(item.pure / data.pageDetail.itemSize) * 100}
          />
          <div className={classes.textField}>
            <Typography variant="h6">
              {stringFormat(lang.panel.stat.eachTitle, [
                lang.grid.ordinal[index]
              ])}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {timeFormat(
                new Date(item.startTime),
                lang.panel.stat.timeFormatString
              )}
              {item.endTime
                ? " ~ " +
                  timeFormat(
                    new Date(item.endTime),
                    lang.panel.stat.timeFormatString
                  )
                : lang.panel.stat.ongoing}
            </Typography>
            {lang.panel.stat.class.map((subItem, index) => (
              <Typography variant="body2" color="textSecondary" key={index}>
                {subItem}
                {index === 0 ? (
                  <span>
                    {item.pure}
                    <b>
                      {" ("}
                      {((item.pure / data.pageDetail.itemSize) * 100).toFixed(
                        2
                      )}
                      {"%)"}
                    </b>
                  </span>
                ) : index === 1 ? (
                  <span>
                    {item.far}
                    {" ("}
                    {((item.far / data.pageDetail.itemSize) * 100).toFixed(2)}
                    {"%)"}
                  </span>
                ) : (
                  `${data.pageDetail.itemSize - item.pure - item.far}`
                )}
              </Typography>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
