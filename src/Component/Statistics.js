import React from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Popover from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Accuracy from "./Accuracy";
import Frequency from "./Frequency";
import Chart from "./Chart";
import Collapse from "@material-ui/core/Collapse";
import DeleteConfirm from "../Dialogue/DeleteConfirm";
import Skeleton from "@material-ui/lab/Skeleton";
import { SLR, PolynomialRegression } from "ml-regression";
import { InlineMath } from "react-katex";
import { PanelContext } from "../Page/Panel";
import { HotKeys } from "react-hotkeys";
import {
  stringFormat,
  timeFormat,
  routeIndex,
  defaultDigit,
  setStateDelay,
  maxFrequency,
  maxRecall,
  markMap,
  leaveDelay
} from "../Interface/Constant";
import "katex/dist/katex.min.css";

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
  },
  log: {
    width: "100%",
    padding: theme.spacing(0, 2)
  },
  subLog: {
    padding: theme.spacing(0, 2),
    display: "flex",
    flexDirection: "row"
  },
  popover: {
    width: "20vw",
    padding: theme.spacing(1, 4)
  },
}));

const keyMap = {
  backToMenu: "esc",
};

export default function Statistics(props) {
  const classes = useStyles();
  const { state, handle } = props;
  const context = React.useContext(PanelContext);
  const keyHandler = {
    backToMenu: () => handle.setCurrentRoute(routeIndex.cover),
  };

  const [anime, setAnime] = React.useState(0);
  const [lineData, setLineData] = React.useState([]);
  const [barData, setBarData] = React.useState([]);
  const [graph, setGraph] = React.useState("line");

  const [expandAll, setExpandAll] = React.useState(false);
  const [lostAll, setLostAll] = React.useState(null);
  const [expandEach, setExpandEach] = React.useState(new Array(maxRecall).fill(false));
  const [lostEach, setLostEach] = React.useState(new Array(maxRecall).fill(null));
  const [logEach, setLogEach] = React.useState(new Array(maxRecall).fill(null));
  React.useEffect(() => {
    if (state.current.route === routeIndex.stat) {
      setAnime(Math.random());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.current.route]);

  React.useEffect(() => {
    const pageJump = state.current.prevRoute === -1;
    const quitStat = state.current.prevRoute === routeIndex.stat;
    if (pageJump || quitStat) {
      setTimeout(() => {
        setExpandAll(false);
        setExpandEach(new Array(maxRecall).fill(false));
        setLostAll(null);
        setLostEach(new Array(maxRecall).fill(null));
        setLogEach(new Array(maxRecall).fill(null));
        setTimes(1);
      }, pageJump ? 0 : setStateDelay);
    }
  // if any of (unitID, pageID, route) change, than the page change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.current.unitID, state.current.pageID, state.current.route]);

  const [deleteID, setDeleteID] = React.useState(0);
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const [deleteName, setDeleteName] = React.useState("");

  const itemSize = state.pageDetail.itemSize;
  const trackSize = state.pageDetail.trackSize;
  const eachPure = state.statInfo.map((item) => item.pure);
  const eachFar = state.statInfo.map((item) => item.far);
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
  const eachSpan = state.statInfo.reduce((total, item) => {
    if (item.endTime) {
      total.push(new Date(item.endTime) - new Date(item.startTime))
      return total;
    } else return total;
  }, []);
  const eachInterval = state.statInfo.reduce((total, item, index, arr) => {
    if (index) {
      total.push(new Date(item.startTime) - new Date(arr[index - 1].startTime));
      return total;
    } else return total;
  }, []);
  const averageSpan = Stat.average(eachSpan);
  const averageInterval = Stat.average(eachInterval);
  const spanJudge = Stat.judgeTime(averageSpan, true, context.lang.panel.stat.judge);
  const intervalJudge = Stat.judgeTime(averageInterval, false, context.lang.panel.stat.judge);

  React.useEffect(() => {
    if (expandAll) {
      setLineData(eachPure.map((item, index) => ({
        name: context.lang.grid.ordinal[index],
        acc: item / itemSize * 100
      })));
      setBarData(() => {
        let rawFreq = state.itemList.map((item) => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandAll, context.lang]);

  const toggleDelete = (trackID) => {
    setDeleteID(trackID);
    setDeleteConfirm(true);
    setDeleteName(trackID
      ? stringFormat(
        context.lang.popup.delete.single,
        [context.lang.grid.ordinal[trackID - 1]]
      ) : context.lang.popup.delete.clear);
  }

  const deleteTrack = (trackID) => {
    context.request("POST/delete/track", {
      unitID: state.current.unitID,
      pageID: state.current.pageID,
      trackID: trackID
    }).then(() => {
      if (!trackID || trackID === state.pageDetail.trackSize)
        handle.setPageDetail((pageDetail) => ({
          ...pageDetail, timeThis: null
        }))
      if (trackID && state.pageDetail.trackSize > 1) {
        handle.setStatInfo((statInfo) => {
          statInfo.splice(trackID - 1, 1);
          return [...statInfo];
        });
        setExpandEach((expandEach) => {
          expandEach.splice(trackID - 1, 1);
          return [...expandEach];
        })
        setLostEach((lostEach) => {
          lostEach.splice(trackID - 1, 1);
          return [...lostEach];
        });
        setLogEach((logEach) => {
          logEach.splice(trackID - 1, 1);
          return [...logEach];
        });
        handle.setPageDetail((pageDetail) => ({
          ...pageDetail, trackSize: pageDetail.trackSize - 1
        }))
        handle.setItemList((itemList) => itemList.map((item) => {
          let newItem = {};
          Object.keys(item).forEach((subItem) => {
            const num = Number(subItem);
            if (isNaN(num) || num < trackID)
              newItem[subItem] = item[subItem];
            else if (num > trackID)
              newItem[num - 1] = item[num];
          });
          return newItem;
        }))
      } else {
        handle.setStatInfo([]);
        handle.setPageDetail((pageDetail) => ({
          ...pageDetail, trackSize: 0
        }))
        handle.setItemList((itemList) => itemList.map((item) => {
          let newItem = {};
          Object.keys(item).forEach((subItem) => {
            if (isNaN(Number(subItem)))
              newItem[subItem] = item[subItem];
          });
          return newItem;
        }))
        handle.setCurrentRoute(routeIndex.cover);
      }
    });
  };

  const toggleCollapseAll = () => {
    setExpandAll((expandAll) => {
      if (!expandAll) {
        setLostAll((lostAll) => {
          if (lostAll === null) {
            let lost = [];
            state.itemList.forEach((item) => {
              for (let subItem in Object.keys(item)) {
                const times = Number(subItem);
                if (!isNaN(times) && item[times] === "F") {
                  lost.push(item.id);
                  break;
                }
              }
            })
            return lost;
          } else return lostAll;
        });
      }
      return !expandAll;
    });
  };

  const toggleCollapseEach = (index) => {
    setExpandEach((expandEach) => {
      if (!expandEach[index]) {
        setLostEach((lostEach) => {
          let lost = [];
          state.itemList.forEach((subItem) => {
            if (subItem[index + 1] === "F")
              lost.push(subItem.id);
          });
          if (lostEach[index] === null) {
            return lostEach.map((subItem, subIndex) => 
              index === subIndex ? lost : subItem);
          } else return lostEach;
        })

        if (logEach[index] === null) {
          Promise.all([
            context.request("GET/data/log", {
              unitID: state.current.unitID,
              pageID: state.current.pageID,
              trackID: index + 1
            }, undefined, true),
            new Promise((resolve) => {
              let newData = [], endTime = state.statInfo[index].endTime;
              if (endTime) {
                endTime = new Date(endTime);
                state.itemList.forEach((item) => {
                  if (new Date(item.time) - endTime > 0)
                    newData.push({ id: item.id, time: item.time });
                })
                resolve(newData);
              } else resolve(newData);
            })
          ])
            .then(([modData, newData]) => {
              const concatData = modData.concat(newData);
              concatData.sort((left, right) =>
                left.time > right.time ? -1 : left.time < right.time ? 1 : 0
              );
              setLogEach((logEach) => logEach.map((subItem, subIndex) =>
                index === subIndex ? concatData : subItem));
            });
        }
      }
      return expandEach.map((subItem, subIndex) =>
        subIndex === index ? !subItem : subItem)
    });
  };

  // state about regression
  let leaveOverlay = null;
  const [times, setTimes] = React.useState(0);
  const [linear, setLinear] = React.useState(" ");
  const [poly, setPoly] = React.useState(0);
  const [negative, setNegative] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    const trackSize = state.statInfo.length;
    if (trackSize < 2) {
      setNegative(true);
      setLinear(" ");
      return;
    };
    const xAxis = new Array(trackSize).fill().map((_, index) => index + 1);
    const yAxis = new Array(trackSize).fill().map((_, index) =>
      state.statInfo[index].pure / itemSize);
    const linearRegression = new SLR(xAxis, yAxis);
    const polynomialRegression = new PolynomialRegression(xAxis, yAxis, times);
    const katexString =  linearRegression.toLaTeX?.(precision || 1)
      .replace?.(/\*/g, "").replace?.(/x/g, "n");
    setNegative(linearRegression.coefficients[1] < 0);
    setLinear(typeof katexString === "string" ? katexString : " ");
    setPoly(polynomialRegression.predict(trackSize + 1));
  }, [state.statInfo, precision, itemSize, times]);

  return (
    <HotKeys keyMap={keyMap} handlers={keyHandler} className={classes.root}>
      <div className={classes.buttonPanel}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => handle.setCurrentRoute(routeIndex.cover)}
          style={{ borderRadius: 0 }}
        >
          {context.lang.common.back}
        </Button>
        <div style={{ flexGrow: 1 }} />
        <Typography variant="subtitle2" color="textSecondary">
          {context.lang.panel.stat.precision}
        </Typography>
        <Slider
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
            lowRank={state.lowRank}
          />
          <div className={classes.textField}>
            <Typography variant="h6">
              {context.lang.panel.stat.totalTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {context.lang.panel.stat.avgSpan}
              {Stat.timestampCount(
                averageSpan, context.lang.panel.stat.timeSpan
              )}
              {" / "}
              {Stat.timestampCount(
                averageSpan / itemSize, context.lang.panel.stat.timeSpan
              )}
              {spanJudge && ` (${spanJudge})`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {context.lang.panel.stat.avgInterval}
              {Stat.timestampCount(
                averageInterval, context.lang.panel.stat.timeSpan
              )}
              {intervalJudge && ` (${intervalJudge})`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {varianceSame ? context.lang.panel.stat.varianceSame : context.lang.panel.stat.variance}
              {Stat.atMostDigits(variancePure, precision)}
              {!varianceSame && " / "}
              {!varianceSame && Stat.atMostDigits(varianceFar, precision)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {context.lang.panel.stat.avgClass}
              {Stat.atMostDigits(averagePure, precision)}
              {" / "}
              {Stat.atMostDigits(averageFar, precision)}
              {" / "}
              {Stat.atMostDigits(itemSize - averagePure - averageFar, precision)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {context.lang.panel.stat.avgAcc}
              <b>{Stat.digitsPercentage(averagePure, itemSize, precision)}</b>
              {" / "}
              {Stat.digitsPercentage(averageFar, itemSize, precision)}
              {Stat.judgeRank() && ` (${context.lang.panel.stat.judge.tooFew})`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {context.lang.panel.stat.bestWorst}
              {Stat.digitsPercentage(Math.max(...eachPure), itemSize, precision)}
              {" / "}
              {Stat.digitsPercentage(Math.max(...eachFar), itemSize, precision)}
            </Typography>
            {state.statInfo.length >= 2 && <Typography variant="body2" color="textSecondary">
              {context.lang.panel.stat.linearRegression}
              <InlineMath math={linear} />
              {negative && ` (${context.lang.panel.stat.judge.negative})`}
            </Typography>}
            {state.statInfo.length >= 2 &&
            <Typography variant="body2" color="textSecondary">
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
                onMouseEnter={(event) => {
                  if (state.statInfo.length >= 3)
                    setAnchorEl(event.currentTarget);
                }}
                onMouseLeave={() => leaveOverlay = setTimeout(() => setAnchorEl(null), leaveDelay)}>
                {context.lang.panel.stat.prediction}
              </Typography>
              {Stat.digitsPercentage(poly, 1, precision)}
              {(poly > 1 || poly < 0) && ` (${context.lang.panel.stat.judge.overfit})`}
            </Typography>}
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onMouseEnter={() => { if (leaveOverlay) clearTimeout(leaveOverlay) }}
              onMouseLeave={() => setAnchorEl(null)}
            >
              <Paper square className={classes.popover}>
                <Typography variant="subtitle2" color="textSecondary">
                  {context.lang.panel.stat.predictLabel}
                </Typography>
                <Slider
                  component="div"
                  value={times}
                  onChange={(_, value) => setTimes(value)}
                  getAriaValueText={String}
                  valueLabelDisplay="auto"
                  step={1}
                  min={1}
                  max={trackSize - 1}
                />
              </Paper>
            </Popover>
          </div>
          <div className={classes.buttonField}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expandAll,
              })}
              onClick={toggleCollapseAll}
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
                label={context.lang.panel.stat.line}
                control={<Radio color="primary" />}
              />
              <FormControlLabel
                value="bar"
                label={context.lang.panel.stat.bar}
                control={<Radio color="primary" />}
              />
            </RadioGroup>
            <div style={{ flexGrow: 1 }}/>
            <Button
              variant="outlined"
              color="primary"
              disabled={!lostAll?.length}
              startIcon={<CheckCircleOutlinedIcon />}
              style={{ borderRadius: 0, marginRight: 12 }}
              onClick={() => {
                handle.setRecollect(true);
                handle.setTimerInitial((lastValue) => [0, lastValue[1] + 1]);
                handle.setRecall({
                  pure: [], far: [],
                  lost: [...lostAll].sort((left, right) => left - right)
                });
                handle.setCurrentRoute(routeIndex.recall);
              }}
            >
              {context.lang.panel.stat.recollect}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CloseIcon />}
              style={{ borderRadius: 0 }}
              onClick={() => toggleDelete(0)}
            >
              {context.lang.panel.stat.clearRecall}
            </Button>
          </div>
          <div className={classes.invisibleGraph}>
            {graph === "line"
              ? <Chart data={lineData} />
              : <Frequency data={barData} />}
          </div>
        </Collapse>
      </Card>

      {state.statInfo.map((item, index) => (
        <Card className={classes.rankingPanel} key={index}>
          <div className={classes.visible}>
            <Accuracy
              anime={anime}
              times={0.75}
              value={(item.pure / itemSize) * 100}
              lowRank={state.lowRank}
            />
            <div className={classes.textField}>
              <Typography variant="h6">
                {stringFormat(context.lang.panel.stat.eachTitle, [
                  context.lang.grid.ordinal[index]
                ])}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {timeFormat(
                  item.startTime,
                  context.lang.panel.stat.timeFormatString
                )}
                {item.endTime
                  ? " ~ " +
                    timeFormat(
                      item.endTime,
                      context.lang.panel.stat.timeFormatString
                    ) +
                    ` (${Stat.timestampCount(
                        new Date(item.endTime) - new Date(item.startTime),
                        context.lang.panel.stat.timeSpan
                      )})`
                  : context.lang.panel.stat.ongoing}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {context.lang.panel.stat.class}
                {item.pure}
                {" / "}
                {item.far}
                {" / "}
                {itemSize - item.pure - item.far}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {context.lang.panel.stat.acc}
                <b>{Stat.digitsPercentage(item.pure, itemSize, precision)}</b>
                {` (${Stat.accDiff(item.pure, averagePure, itemSize)})`}
                {" / "}
                {Stat.digitsPercentage(item.far, itemSize, precision)}
                {` (${Stat.accDiff(item.far, averageFar, itemSize)})`}
              </Typography>
            </div>
            <div className={classes.buttonField}>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expandEach[index],
                })}
                onClick={() => toggleCollapseEach(index)}
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
          </div>
          <Collapse
            classes={{ wrapperInner: classes.invisible }}
            in={expandEach[index]}
            timeout="auto"
            unmountOnExit
          >
            <div className={classes.invisibleButton}>
              <div style={{ flexGrow: 1 }}/>
              <Button
                variant="outlined"
                color="primary"
                disabled={!lostEach[index]?.length}
                startIcon={<CheckCircleOutlinedIcon />}
                style={{ borderRadius: 0, marginRight: 12 }}
                onClick={() => {
                  handle.setRecollect(true);
                  handle.setTimerInitial((lastValue) => [0, lastValue[1] + 1]);
                  handle.setRecall({
                    pure: [], far: [],
                    lost: [...lostEach[index]].sort((left, right) => left - right)
                  });
                  handle.setCurrentRoute(routeIndex.recall);
                }}
              >
                {context.lang.panel.stat.recollect}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<CloseIcon />}
                style={{ borderRadius: 0 }}
                onClick={() => toggleDelete(index + 1)}
              >
                {context.lang.panel.stat.clearEachRecall}
              </Button>
            </div>
            <div className={classes.log}>
              {logEach[index] === null
                ? <Skeleton variant="text" style={{ width: "50%" }} />
                : logEach[index].length
                ? <TableContainer className={classes.tableField}>
                  <Table className={classes.table} size="small">
                    <TableHead>
                      <TableRow>
                        {context.lang.panel.stat.header.map((item, index) => (
                          <TableCell align="center" key={index} children={item} />
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {logEach[index].map((subItem, subIndex) => (
                        <TableRow key={subIndex}>
                          <TableCell component="th" scope="row" align="center">
                            {subItem.trans
                              ? context.lang.panel.stat.modData
                              : context.lang.panel.stat.newData}
                          </TableCell>
                          <TableCell align="center">
                            {subItem.id}
                          </TableCell>
                          <TableCell align="center">
                            {timeFormat(subItem.time, context.lang.panel.stat.timeFormatString)}
                          </TableCell>
                          <TableCell align="center">
                            {subItem.trans
                              ? <span>
                                {markMap[subItem.trans[0]]}
                                <ArrowRightAltIcon fontSize="inherit"/>
                                {markMap[subItem.trans[1]]}
                              </span>
                              : context.lang.panel.stat.notApplicable}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                : <Typography>{context.lang.panel.stat.noLog}</Typography>}
            </div>
          </Collapse>
        </Card>
      ))}
      <DeleteConfirm
        open={deleteConfirm}
        type="recall"
        name={deleteName}
        handleClose={() => setDeleteConfirm(false)}
        handleDeleteTarget={() => deleteTrack(deleteID)}
      />
    </HotKeys>
  );
}
