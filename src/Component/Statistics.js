import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import CloseIcon from "@material-ui/icons/Close";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
      padding: theme.spacing(2, 2, 1, 2),
      alignSelf: "flex-start"
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2, 2, 2, 4)
    }
  },
  buttonField: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      flexDirection: "row",
      padding: theme.spacing(0, 2),
    },
    [theme.breakpoints.up("sm")]: {
      height: "100%",
      flexDirection: "column",
    }
  }
}));

const Stat = {
  digit: 2,
  atMostDigits: (number, digit) => {
    const base = Math.pow(10, digit);
    return Math.round(number * base) / base;
  },
  digitsPercentage: (numerator, denominator, digit) => {
    return `${(numerator / denominator * 100).toFixed(digit)}%`;
  },
  accDiff: (freq, avg, sum) => {
    return (avg > freq ? "-" : "+")
      + Stat.digitsPercentage(Math.abs(avg - freq), sum, Stat.digit);
  },
  timestampCount: (start, end, suffix) => {
    const milliseconds = new Date(end) - new Date(start);
    if (milliseconds < 60000)
      return `${(milliseconds / 60000).toFixed()}`
  }
};

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
  const trackSize = data.pageDetail.trackSize;
  const averagePure = data.statInfo.reduce((total, item) => total + item.pure, 0) / trackSize;
  const averageFar = data.statInfo.reduce((total, item) => total + item.far, 0) / trackSize;
  const eachPure = data.statInfo.map((item) => item.pure);
  const eachFar = data.statInfo.map((item) => item.far);

  return (
    <div className={classes.root}>
      <div className={classes.buttonPanel}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => handle.setCurrentRoute(routeIndex.cover)}
          style={{ borderRadius: 0 }}
        >
          {lang.common.back}
        </Button>
        <div style={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<CloseIcon />}
          style={{ borderRadius: 0 }}
        >
          {lang.panel.stat.clearRecall}
        </Button>
      </div>

      <Card className={classes.rankingPanel} >
        <Accuracy
          anime={anime}
          times={1}
          value={(averagePure / itemSize) * 100}
        />
        <div className={classes.textField}>
          <Typography variant="h6">
            {lang.panel.stat.totalTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {lang.panel.stat.avgClass}
            {Stat.atMostDigits(averagePure, Stat.digit)}
            {" / "}
            {Stat.atMostDigits(averageFar, Stat.digit)}
            {" / "}
            {Stat.atMostDigits(itemSize - averagePure - averageFar, Stat.digit)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {lang.panel.stat.avgAcc}
            <b>{Stat.digitsPercentage(averagePure, itemSize, Stat.digit)}</b>
            {" / "}
            {Stat.digitsPercentage(averageFar, itemSize, Stat.digit)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {lang.panel.stat.bestWorst}
            {Stat.digitsPercentage(Math.max(...eachPure), itemSize, Stat.digit)}
            {" / "}
            {Stat.digitsPercentage(Math.max(...eachFar), itemSize, Stat.digit)}
          </Typography>
        </div>
      </Card>
      
      {data.statInfo.map((item, index) => (
        <Card className={classes.rankingPanel} key={index}>
          <Accuracy
            anime={anime}
            times={0.8}
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
              {lang.panel.stat.class}
              {item.pure}
              {" / "}
              {item.far}
              {" / "}
              {itemSize - item.pure - item.far}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {lang.panel.stat.acc}
              <b>{((item.pure / itemSize) * 100).toFixed(2)}{"%"}</b>
              {` (${Stat.accDiff(item.pure, averagePure, itemSize)}%)`}
              {" / "}
              {`${((item.far / itemSize) * 100).toFixed(2)}%`}
              {` (${Stat.accDiff(item.far, averageFar, itemSize)}%)`}
            </Typography>
          </div>
          <div className={classes.buttonField}>
            <IconButton>
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </Card>
      ))}
    </div>
  );
}
