import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import ViewCompactOutlinedIcon from "@material-ui/icons/ViewCompactOutlined";
import DataUsageOutlinedIcon from "@material-ui/icons/DataUsageOutlined";
import ClearConfirm from "../Dialogue/ClearComfirm";
import { packedPOST } from "../Interface/Request";
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
    flexDirection: "row"
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
  const { lang, data, handle } = props;
  const iconProps = {
    color: "action",
    className: classes.pageCover
  };

  const [clear, setClear] = React.useState(false);

  const verifyTime = () => {
    if (data.pageDetail.timeThis) setClear(true);
    else toggleRecall();
  }

  const toggleRecall = (clear) => {
    packedPOST({
      uri: "/data/this",
      query: {
        userID: data.userID,
        unitID: data.current.unitID,
        pageID: data.current.pageID,
        clear: clear
      },
      msgbox: handle.toggleMessageBox,
      kick: handle.toggleKick,
      lang: lang
    }).then((out) => {
      const attribute = clear ? data.pageDetail.trackSize : data.pageDetail.trackSize + 1;
      if (clear !== false)
        handle.setItemList((itemList) => itemList.map((item) => ({
          ...item, [attribute]: "L"
        })));
      const startTime = out.time;
      handle.setRecall({
        pure: [],
        far: [],
        lost: clear === false
          ? out.lost
          : new Array(data.pageDetail.itemSize).fill().map((_, index) => index + 1)
      });
      handle.setPageDetail((pageDetail) => ({
        ...pageDetail,
        timeThis: true,
        trackSize: pageDetail.trackSize + (clear === undefined ? 1 : 0)
      }))
      handle.setCurrentRoute(routeIndex.recall);
      handle.setTimerInitial(startTime);
    });
  }

  return (
    <div className={classes.root}>
      <Card className={classes.basicInfo}>
        <div className={classes.imageInfo}>
          {data.current.pageCover < pageIcon().length
            ? pageIcon(iconProps)[data.current.pageCover]
            : pageIcon(iconProps)[0]}
        </div>
        <div className={classes.textInfo}>
          <Typography component="span" variant="h5" color="textPrimary">
            {data.current.pageName}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {data.current.unitName}
            &emsp;
            {`${data.pageDetail.itemSize} / ${data.pageDetail.trackSize}`}
            &emsp;
            {stringFormat(lang.panel.cover.createTime, [
              timeFormat(
                new Date(data.pageDetail.pageCreateTime),
                "yyyy-MM-dd hh:mm:ss"
              )
            ])}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {data.current.pagePresent.length
              ? data.current.pagePresent
              : lang.panel.cover.nilPresent}
          </Typography>
        </div>
      </Card>
      <Card className={classes.moreInfo}>
        <Typography variant="button" color="textSecondary">
          {lang.panel.cover.details}
        </Typography>
        <div className={classes.buttonField}>
          <div className={classes.button}>
            <IconButton
              onClick={verifyTime}
              disabled={!data.pageDetail.itemSize || data.pageDetail.trackSize >= maxRecall}
            >
              <CheckCircleOutlinedIcon fontSize="large" />
            </IconButton>
            <Typography variant="button" color="textSecondary" align="center">
              {lang.panel.cover.recall}
            </Typography>
          </div>
          <div className={classes.button}>
            <IconButton onClick={() => handle.setCurrentRoute(routeIndex.view)}>
              <ViewCompactOutlinedIcon fontSize="large" />
            </IconButton>
            <Typography variant="button" color="textSecondary" align="center">
              {lang.panel.cover.view}
            </Typography>
          </div>
          <div className={classes.button}>
            <IconButton
              disabled={!data.pageDetail.trackSize}
            >
              <DataUsageOutlinedIcon fontSize="large" />
            </IconButton>
            <Typography variant="button" color="textSecondary" align="center">
              {lang.panel.cover.stat}
            </Typography>
          </div>
        </div>
      </Card>
      <ClearConfirm
        lang={lang}
        open={clear}
        handleClose={() => setClear(false)}
        handleRecall={toggleRecall}
      />
    </div>
  );
}
