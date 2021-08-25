import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import ViewCompactOutlinedIcon from "@material-ui/icons/ViewCompactOutlined";
import DataUsageOutlinedIcon from "@material-ui/icons/DataUsageOutlined";
import ViewCarouselOutlinedIcon from "@material-ui/icons/ViewCarouselOutlined";
import ClearConfirm from "../Dialogue/ClearComfirm";
import { PanelContext } from "../Page/Panel";
import {
  timeFormat,
  stringFormat,
  pageIcon,
  routeIndex,
  maxRecall
} from "../Interface/Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto"
  },
  basicInfo: {
    borderRadius: "0",
    margin: theme.spacing(2, 2, 1, 2),
    padding: theme.spacing(2, 4),
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    },
    overflow: "visible"
  },
  moreInfo: {
    borderRadius: "0",
    margin: theme.spacing(1, 2, 2, 2),
    padding: theme.spacing(2, 4),
    display: "flex",
    flexDirection: "column",
    overflow: "visible"
  },
  imageInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  textInfo: {
    padding: theme.spacing(2, 2),
    flexGrow: "1"
  },
  buttonField: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  button: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  pageCover: {
    width: theme.spacing(16),
    height: theme.spacing(16)
  }
}));

export default function Cover(props) {
  const classes = useStyles();
  const { state, handle } = props;
  const context = React.useContext(PanelContext);
  const iconProps = {
    color: "action",
    className: classes.pageCover
  };

  const [clear, setClear] = React.useState(false);
  const verifyTime = () => {
    if (state.pageDetail.timeThis) setClear(true);
    else toggleRecall();
  }

  const toggleRecall = (clear) => {
    context.request("POST/data/this", {
      unitID: state.current.unitID,
      pageID: state.current.pageID,
      bool: clear
    }).then((out) => {
      const attribute = clear ? state.pageDetail.trackSize : state.pageDetail.trackSize + 1;
      if (clear !== false)
        handle.setItemList((itemList) => itemList.map((item) => ({
          ...item, [attribute]: "L"
        })));
      const startTime = out.time;
      handle.setRecollect(false);
      handle.setRecall({
        pure: [],
        far: [],
        lost: clear === false
          ? out.lost
          : new Array(state.pageDetail.itemSize).fill().map((_, index) => index + 1)
      });
      handle.setPageDetail((pageDetail) => ({
        ...pageDetail,
        timeThis: true,
        trackSize: pageDetail.trackSize + (clear === undefined ? 1 : 0)
      }))
      handle.setCurrentRoute(routeIndex.recall);
      handle.setTimerInitial((lastValue) => [startTime, lastValue[1] + 1]);
    });
  };

  const toggleStat = () => {
    context.request("GET/data/stat", {
      unitID: state.current.unitID,
      pageID: state.current.pageID,
    }).then((out) => {
      handle.setStatInfo(out);
      handle.setCurrentRoute(routeIndex.stat);
    });
  };

  const toggleGallery = () => {
    context.request("GET/data/image", {
      unitID: state.current.unitID,
      pageID: state.current.pageID,
    }).then((out) => {
      handle.setImage(out);
      handle.setCurrentRoute(routeIndex.gallery);
    });
  };

  return (
    <div className={classes.root}>
      <Card className={classes.basicInfo}>
        <div className={classes.imageInfo}>
          {state.current.pageCover < pageIcon().length
            ? pageIcon(iconProps)[state.current.pageCover]
            : pageIcon(iconProps)[0]}
        </div>
        <div className={classes.textInfo}>
          <Typography component="span" variant="h5" color="textPrimary">
            {state.current.pageName}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {state.current.unitName}
            &emsp;
            {`${state.pageDetail.itemSize} / ${state.pageDetail.trackSize}`}
            &emsp;
            {stringFormat(context.lang.panel.cover.createTime, [
              timeFormat(
                new Date(state.pageDetail.pageCreateTime),
                "yyyy-MM-dd hh:mm:ss"
              )
            ])}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {state.current.pagePresent.length
              ? state.current.pagePresent
              : context.lang.panel.cover.nilPresent}
          </Typography>
        </div>
      </Card>
      <Card className={classes.moreInfo}>
        <Typography variant="button" color="textSecondary">
          {context.lang.panel.cover.details}
        </Typography>
        <div className={classes.buttonField}>
          <div className={classes.button}>
            <IconButton
              onClick={verifyTime}
              disabled={!state.pageDetail.itemSize || state.pageDetail.trackSize >= maxRecall}
            >
              <CheckCircleOutlinedIcon fontSize="large" />
            </IconButton>
            <Typography variant="button" color="textSecondary" align="center">
              {context.lang.panel.cover.recall}
            </Typography>
          </div>
          <div className={classes.button}>
            <IconButton onClick={() => handle.setCurrentRoute(routeIndex.view)}>
              <ViewCompactOutlinedIcon fontSize="large" />
            </IconButton>
            <Typography variant="button" color="textSecondary" align="center">
              {context.lang.panel.cover.view}
            </Typography>
          </div>
          <div className={classes.button}>
            <IconButton
              disabled={!state.pageDetail.trackSize}
              onClick={toggleStat}
            >
              <DataUsageOutlinedIcon fontSize="large" />
            </IconButton>
            <Typography variant="button" color="textSecondary" align="center">
              {context.lang.panel.cover.stat}
            </Typography>
          </div>
          <div className={classes.button}>
            <IconButton onClick={toggleGallery}>
              <ViewCarouselOutlinedIcon fontSize="large" />
            </IconButton>
            <Typography variant="button" color="textSecondary" align="center">
              {context.lang.panel.cover.gallery}
            </Typography>
          </div>
        </div>
      </Card>
      <ClearConfirm
        open={clear}
        handleClose={() => setClear(false)}
        handleRecall={toggleRecall}
      />
    </div>
  );
}
