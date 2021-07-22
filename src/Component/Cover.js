import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import ViewCompactOutlinedIcon from "@material-ui/icons/ViewCompactOutlined";
import DataUsageOutlinedIcon from "@material-ui/icons/DataUsageOutlined";
import { timeFormat, stringFormat, pageIcon } from "../Interface/Constant";

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
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
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
    height: theme.spacing(16),
  }
}));

export default function Cover(props) {
  const classes = useStyles();
  const { lang, current, pageDetail, setCurrentRoute } = props;
  const iconProps = {
    color: "action",
    className: classes.pageCover
  }

  return (
    <div className={classes.root}>
      <Card className={classes.basicInfo}>
        <div className={classes.imageInfo}>
          {pageIcon(iconProps)[current.pageCover]}
        </div>
        <div className={classes.textInfo}>
          <Typography component="span" variant="h5" color="textPrimary">
            {current.pageName}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {current.unitName}
            &emsp;
            {`${pageDetail.itemSize} / ${pageDetail.trackSize}`}
            &emsp;
            {stringFormat(
              lang.panel.cover.createTime,
              [timeFormat(new Date(pageDetail.pageCreateTime), "yyyy-MM-dd hh:mm:ss")]
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {current.pagePresent.length ? current.pagePresent : lang.panel.cover.nilPresent}
          </Typography>
        </div>
      </Card>
      <Card className={classes.moreInfo}>
        <Typography variant="button" color="textSecondary">
          {lang.panel.cover.details}
        </Typography>
        <div className={classes.buttonField}>
          <div className={classes.button}>
            <IconButton>
              <CheckCircleOutlinedIcon fontSize="large"/>
            </IconButton>
            <Typography variant="button" color="textSecondary" align="center">
              {lang.panel.cover.recall}
            </Typography>
          </div>
          <div className={classes.button}>
            <IconButton onClick={() => setCurrentRoute(2)}>
              <ViewCompactOutlinedIcon fontSize="large" />
            </IconButton>
            <Typography variant="button" color="textSecondary" align="center">
              {lang.panel.cover.view}
            </Typography>
          </div>
          <div className={classes.button}>
            <IconButton>
              <DataUsageOutlinedIcon fontSize="large" />
            </IconButton>
            <Typography variant="button" color="textSecondary" align="center">
              {lang.panel.cover.stat}
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
}
