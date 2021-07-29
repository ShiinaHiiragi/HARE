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
    overflow: "visible",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  textField: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2)
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2, 2, 2, 4)
    }
  }
}));

const accDiff = (freq, avg, sum) => {
  return (avg > freq ? "-" : "+") + (Math.abs(avg - freq) / sum * 100).toFixed(2);
}

export default function Statistics(props) {
  const classes = useStyles();
  const { lang, data, handle } = props;
  const [anime, setAnime] = React.useState(0);
  React.useEffect(() => {
    if (data.current.route === routeIndex.stat) setAnime(Math.random());
  }, [data.current.route === routeIndex.stat]);

  // 最好 最差 平均 平均等级 时长 间隔
  // 每一次的曲线图，错误频数直方图 方差 下次目标（建议）
  const itemSize = data.pageDetail.itemSize;
  const averagePure = data.statInfo.reduce((total, item) => total + item.pure, 0) / itemSize;
  const averageFar = data.statInfo.reduce((total, item) => total + item.far, 0) / itemSize;

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
      <Card className={classes.rankingPanel} >
        <Accuracy
          anime={anime}
          value={(averagePure / itemSize) * 100}
        />
        <div className={classes.textField}>
          <Typography variant="h6">
            {lang.panel.stat.totalTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {lang.panel.stat.avgAcc}
            <b>{((averagePure / itemSize) * 100).toFixed(2)}{"%"}</b>
            {" / "}
            {`${((averageFar / itemSize) * 100).toFixed(2)}%`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {lang.panel.stat.avgClass}
            {Math.round(averagePure * 100) / 100}
            {" / "}
            {Math.round(averageFar * 100) / 100}
            {" / "}
            {itemSize - averagePure - averageFar}
          </Typography>
        </div>
      </Card>
      
      {data.statInfo.map((item, index) => (
        <Card className={classes.rankingPanel} key={index}>
          <Accuracy
            anime={anime}
            value={(item.pure / itemSize) * 100}
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
            <Typography variant="body2" color="textSecondary">
              {lang.panel.stat.acc}
              <b>{((item.pure / itemSize) * 100).toFixed(2)}{"%"}</b>
              {` (${accDiff(item.pure, averagePure, itemSize)}%)`}
              {" / "}
              {`${((item.far / itemSize) * 100).toFixed(2)}%`}
              {` (${accDiff(item.far, averageFar, itemSize)}%)`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {lang.panel.stat.class}
              {item.pure}
              {" / "}
              {item.far}
              {" / "}
              {itemSize - item.pure - item.far}
            </Typography>
          </div>
        </Card>
      ))}
    </div>
  );
}
