import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import requestURL from "../Interface/URL";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({

}));

export default function PersonalInfo(props) {
  const classes = useStyles();

  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={`${requestURL}/src/cover`}>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={"Ichinoe"}
          secondary={"abc@xyz.com"}
        />
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </ListItem>
    </List>
  );
}
