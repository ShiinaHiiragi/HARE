import React from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accuracy from "./Accuracy";
import Frequency from "./Frequency";
import Chart from "./Chart";
import Collapse from "@material-ui/core/Collapse";
import {
  stringFormat,
  timeFormat,
  routeIndex,
  defaultDigit,
  setStateDelay,
  maxFrequency
} from "../Interface/Constant";

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
    flexDirection: "column"
  },
  visible: {
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
  invisible: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  invisibleButton: {
    padding: theme.spacing(1, 0),
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  invisibleGraph: {
    [theme.breakpoints.only("xs")]: {
      width: "96%",
      height: 160
    },
    [theme.breakpoints.only("sm")]: {
      width: "84%",
      height: 200
    },
    [theme.breakpoints.up("md")]: {
      width: "72%",
      height: 240
    }
  },
  slider: {
    width: 144,
    margin: theme.spacing(0, 1, 0, 2)
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
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  selector: {
    flexDirection: "row"
  }
}));

export default function Statistics(props) {
  const classes = useStyles();
  const { lang, data, handle } = props;

  const [anime, setAnime] = React.useState(0);
  const [lineData, setLineData] = React.useState([]);
  const [barData, setBarData] = React.useState([]);
  const [graph, setGraph] = React.useState("line");

  const [expandAll, setExpandAll] = React.useState(false);
  React.useEffect(() => {
    if (data.current.route === routeIndex.stat) {
      setAnime(Math.random());
    } else {
      setTimeout(() => setExpandAll(false), setStateDelay);
    };
  }, [data.current.route === routeIndex.stat]);

  const itemSize = data.pageDetail.itemSize;
  const trackSize = data.pageDetail.trackSize;
  const eachPure = data.statInfo.map((item) => item.pure);
  const eachFar = data.statInfo.map((item) => item.far);
  const averagePure = eachPure.reduce((total, item) => total + item, 0) / trackSize;
  const averageFar = eachFar.reduce((total, item) => total + item, 0) / trackSize;
  const variancePure = eachPure.reduce((total, item) =>
    total + Math.pow(item - averagePure, 2), 0) / itemSize;
  const varianceFar = eachFar.reduce((total, item) =>
    total + Math.pow(item - averageFar, 2), 0) / itemSize;
  const varianceSame = variancePure === varianceFar;

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
          : isNaN(deltaTime)
          ? suffix.noData
          : null;
      }
    },
    judgeRank: () => (itemSize < 25 && averagePure * 100 < itemSize * 84)
  }), [precision, averagePure, itemSize]);

  // span: start -> end, interval: start -> next start
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
  const averageSpan = Stat.average(eachSpan);
  const averageInterval = Stat.average(eachInterval);
  const spanJudge = Stat.judgeTime(averageSpan, true, lang.panel.stat.judge);
  const intervalJudge = Stat.judgeTime(averageInterval, false, lang.panel.stat.judge);

  React.useEffect(() => {
    if (expandAll) {
      setLineData(eachPure.map((item, index) => ({
        name: lang.grid.ordinal[index],
        acc: item / itemSize * 100
      })));
      setBarData(() => {
        let rawFreq = data.itemList.map((item) => {
          let farCount = 0, pureCount = 0;
          Object.keys(item).forEach((subItem) => {
            const times = Number(subItem);
            if (!isNaN(times)) {
              farCount += Number(item[times] === "F");
              pureCount += Number(item[times] === "P");
            }
          })
          return {
            name: item.id,
            far: farCount,
            pure: pureCount
          };
        })
        let freq = rawFreq.sort((left, right) => right.far - left.far);
        return freq.slice(0, maxFrequency);
      })
    }
  }, [expandAll, lang]);

  React.useEffect(() => {
    setExpandAll(false);
  }, [data.current.unitID, data.current.pageID]);

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
      </div>

      <Card className={classes.rankingPanel} >
        <div className={classes.visible}>
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
              {varianceSame ? lang.panel.stat.varianceSame : lang.panel.stat.variance}
              {Stat.atMostDigits(variancePure, precision)}
              {!varianceSame && " / "}
              {!varianceSame && Stat.atMostDigits(varianceFar, precision)}
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
              {Stat.judgeRank() && ` (${lang.panel.stat.judge.tooFew})`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {lang.panel.stat.bestWorst}
              {Stat.digitsPercentage(Math.max(...eachPure), itemSize, precision)}
              {" / "}
              {Stat.digitsPercentage(Math.max(...eachFar), itemSize, precision)}
            </Typography>
          </div>
          <div className={classes.buttonField}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expandAll,
              })}
              onClick={() => setExpandAll((expandAll) => !expandAll)}
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>
        <Collapse
          classes={{ wrapperInner: classes.invisible }}
          in={expandAll}
          timeout="auto"
          unmountOnExit
        >
          <div className={classes.invisibleButton}>
            <RadioGroup
              className={classes.selector}
              value={graph}
              onChange={(event) => setGraph(event.target.value)}
            >
              <FormControlLabel
                value="line"
                label={lang.panel.stat.line}
                control={<Radio color="primary" />}
              />
              <FormControlLabel
                value="bar"
                label={lang.panel.stat.bar}
                control={<Radio color="primary" />}
              />
            </RadioGroup>
            <div style={{ flexGrow: 1 }}/>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CloseIcon />}
              style={{ borderRadius: 0 }}
            >
              {lang.panel.stat.clearRecall}
            </Button>
          </div>
          <div className={classes.invisibleGraph}>
            {graph === "line"
              ? <Chart data={lineData} />
              : <Frequency lang={lang} data={barData} />}
          </div>
        </Collapse>
      </Card>
      
      {data.statInfo.map((item, index) => (
        <Card className={classes.rankingPanel} key={index}>
          <div className={classes.visible}>
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
          </div>
        </Card>
      ))}
    </div>
  );
}
