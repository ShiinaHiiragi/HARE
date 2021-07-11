import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import InsertInvitationOutlinedIcon from "@material-ui/icons/InsertInvitationOutlined";
import AlarmOutlinedIcon from "@material-ui/icons/AlarmOutlined";
import InboxOutlinedIcon from "@material-ui/icons/InboxOutlined";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll"
  },
  basicInfo: {
    borderRadius: "0",
    margin: theme.spacing(1, 2, 1, 2),
    padding: theme.spacing(2, 4),
    display: "flex",
    flexDirection: "row",
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
  pageCover: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  }
}));

export default function Cover(props) {
  const classes = useStyles();
  const { lang, current } = props;
  const iconProps = {
    color: "disabled",
    className: classes.pageCover
  }
  const pageIcon = [
    <TurnedInNotIcon {...iconProps}/>,
    <PlaylistAddCheckIcon {...iconProps}/>,
    <InsertInvitationOutlinedIcon {...iconProps}/>,
    <AlarmOutlinedIcon {...iconProps}/>,
    <InboxOutlinedIcon {...iconProps}/>
  ];

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
            {current.unitName}&emsp;{"120 / 1"}&emsp;{"Created at 2020-01-03"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo veniam, provident harum doloremque debitis dolorem animi ipsa quam incidunt molestias porro nisi, omnis error obcaecati eaque nihil eligendi consequatur sint. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat optio omnis est. Consequuntur dicta rerum qui ea iure ducimus possimus sed velit. Adipisci aut quas voluptatibus debitis deleniti hic labore! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius dolor iste odio reic.
          </Typography>
        </div>
      </Card>
      <Card className={classes.basicInfo}>
        啦啦啦啦啦啦啦啦啦啦
      </Card>
    </div>
  );
}
