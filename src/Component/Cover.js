import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import InsertInvitationOutlinedIcon from "@material-ui/icons/InsertInvitationOutlined";
import AlarmOutlinedIcon from "@material-ui/icons/AlarmOutlined";
import InboxOutlinedIcon from "@material-ui/icons/InboxOutlined";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import ViewCompactOutlinedIcon from "@material-ui/icons/ViewCompactOutlined";
import DataUsageOutlinedIcon from "@material-ui/icons/DataUsageOutlined";
import { timeFormat, stringFormat } from "../Interface/Constant";
import packedGET from "../Interface/Request";

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
  const { lang, current, data, handle } = props;
  const [pageDetail, setPageDetail] = React.useState({
    itemSize: 0, trackSize: 0, pageCreateTime: "2019-12-31T16:00:00.000Z"
  });
  const iconProps = {
    color: "action",
    className: classes.pageCover
  }
  const pageIcon = [
    <TurnedInNotIcon {...iconProps}/>,
    <PlaylistAddCheckIcon {...iconProps}/>,
    <InsertInvitationOutlinedIcon {...iconProps}/>,
    <AlarmOutlinedIcon {...iconProps}/>,
    <InboxOutlinedIcon {...iconProps}/>
  ];

  React.useEffect(() => {
    if (current.route === 1) {
      packedGET({
        uri: "/data/page",
        query: {
          userID: data.userID,
          token: data.token,
          unitID: current.unitID,
          pageID: current.pageID
        },
        msgbox: handle.toggleMessageBox,
        kick: handle.toggleKick,
        lang: lang
      })
        .then((out) => {
          setPageDetail({
            itemSize: out.itemsize,
            trackSize: out.tracksize,
            pageCreateTime: out.pagecreatetime
          })
        });
    }
  }, [current]);

  return (
    <div className={classes.root}>
      <Card className={classes.basicInfo}>
        <div className={classes.imageInfo}>
          {pageIcon[current.pageCover]}
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
            {current.pagePresent.length ? current.pagePresent : "(No Description)"}
            {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo veniam, provident harum doloremque debitis dolorem animi ipsa quam incidunt molestias porro nisi, omnis error obcaecati eaque nihil eligendi consequatur sint. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat optio omnis est. Consequuntur dicta rerum qui ea iure ducimus possimus sed velit. Adipisci aut quas voluptatibus debitis deleniti hic labore! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius dolor iste odio reic. */}
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
            <IconButton>
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
