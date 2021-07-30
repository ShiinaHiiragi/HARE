import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accuracy from "./Accuracy";
import { stringFormat, timeFormat, routeIndex, defaultDigit } from "../Interface/Constant";

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
  slider: {
    width: 144,
    margin: theme.spacing(0, 2)
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

export default function Statistics(props) {
  const classes = useStyles();
  const { lang, data, handle } = props;
  const [anime, setAnime] = React.useState(0);
  React.useEffect(() => {
    if (data.current.route === routeIndex.stat) setAnime(Math.random());
  }, [data.current.route === routeIndex.stat]);

  const [precision, setPrecision] = React.useState(defaultDigit);
  const Stat = React.useMemo(() => ({
    split: [1000, 60000, 3600000, 86400000, Infinity],
    average: (array) => {
      return array.reduce((total, item) => total + item, 0) / array.length;
    },
    atMostDigits: (number, digit) => {
      const base = Math.pow(10, digit);
      return Math.round(number * base) / base;
    },
    digitsPercentage: (numerator, denominator, digit) => {
      return `${(numerator / denominator * 100).toFixed(digit)}%`;
    },
    accDiff: (freq, avg, sum) => {
      return (avg > freq ? "-" : "+")
        + Stat.digitsPercentage(Math.abs(avg - freq), sum, precision);
    },
    timestampCount: (deltaTime, suffix) => {
      for (let index = 0; index < Stat.split.length; index += 1) {
        if (deltaTime < Stat.split[index])
          return index
            ? Stat.atMostDigits(deltaTime / Stat.split[index - 1], precision)
              + " " + suffix[index](deltaTime / Stat.split[index - 1])
            : suffix[index];
      }
    },
    judgeTime: (deltaTime, isSpan, suffix) => {
      if (isSpan) {
        deltaTime /= itemSize;
        return deltaTime < Stat.split[0]
          ? suffix.tooShort
          : deltaTime > Stat.split[1]
          ? suffix.tooLong
          : null;
      } else {
        return deltaTime < Stat.split[3]
          ? suffix.tooOften
          : deltaTime > 14 * Stat.split[3]
          ? suffix.tooRare
          : null;
      }
    },
  }), [precision]);

  // 最好 最差 平均 平均等级 时长 间隔
  // 每一次的曲线图，错误频数直方图 方差 下次目标（建议）
  // span: start -> end, interval: start -> next start
  const itemSize = data.pageDetail.itemSize;
  const eachPure = data.statInfo.map((item) => item.pure);
  const eachFar = data.statInfo.map((item) => item.far);
  const eachSpan = data.statInfo.reduce((total, item) => {
    if (item.endTime) {
      total.push(new Date(item.endTime) - new Date(item.startTime))
      return total;
    } else return total;
  }, []);
  const eachInterval = data.statInfo.reduce((total, item, index, arr) => {
    if (index) {
      total.push(new Date(item.startTime) - new Date(arr[index - 1].startTime));
      return total;
    } else return total;
  }, []);

  const averagePure = Stat.average(eachPure);
  const averageFar = Stat.average(eachFar);
  const averageSpan = Stat.average(eachSpan);
  const averageInterval = Stat.average(eachInterval);
  const spanJudge = Stat.judgeTime(averageSpan, true, lang.panel.stat.judge);
  const intervalJudge = Stat.judgeTime(averageInterval, false, lang.panel.stat.judge);

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
        <Typography variant="subtitle2" color="textSecondary">
          {lang.panel.stat.precision}
        </Typography>
        <Slider
          marks
          value={precision}
          step={1}
          min={0}
          max={6}
          valueLabelDisplay="off"
          className={classes.slider}
          onChange={(_, value) => setPrecision(value)}
        />
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
          times={0.92}
          value={(averagePure / itemSize) * 100}
        />
        <div className={classes.textField}>
          <Typography variant="h6">
            {lang.panel.stat.totalTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {lang.panel.stat.avgSpan}
            {Stat.timestampCount(
              averageSpan, lang.panel.stat.timeSpan
            )}
            {" / "}
            {Stat.timestampCount(
              averageSpan / itemSize, lang.panel.stat.timeSpan
            )}
            {spanJudge && ` (${spanJudge})`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {lang.panel.stat.avgInterval}
            {Stat.timestampCount(
              averageInterval, lang.panel.stat.timeSpan
            )}
            {intervalJudge && ` (${intervalJudge})`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {lang.panel.stat.avgClass}
            {Stat.atMostDigits(averagePure, precision)}
            {" / "}
            {Stat.atMostDigits(averageFar, precision)}
            {" / "}
            {Stat.atMostDigits(itemSize - averagePure - averageFar, precision)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {lang.panel.stat.avgAcc}
            <b>{Stat.digitsPercentage(averagePure, itemSize, precision)}</b>
            {" / "}
            {Stat.digitsPercentage(averageFar, itemSize, precision)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {lang.panel.stat.bestWorst}
            {Stat.digitsPercentage(Math.max(...eachPure), itemSize, precision)}
            {" / "}
            {Stat.digitsPercentage(Math.max(...eachFar), itemSize, precision)}
          </Typography>
        </div>
        <div className={classes.buttonField}>
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </Card>
      
      {data.statInfo.map((item, index) => (
        <Card className={classes.rankingPanel} key={index}>
          <Accuracy
            anime={anime}
            times={0.75}
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
                  ) +
                  ` (${Stat.timestampCount(
                      new Date(item.endTime) - new Date(item.startTime),
                      lang.panel.stat.timeSpan
                    )})`
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
              <b>{Stat.digitsPercentage(item.pure, itemSize, precision)}</b>
              {` (${Stat.accDiff(item.pure, averagePure, itemSize)})`}
              {" / "}
              {Stat.digitsPercentage(item.far, itemSize, precision)}
              {` (${Stat.accDiff(item.far, averageFar, itemSize)})`}
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
