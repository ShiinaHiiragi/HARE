import React from "react";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import GlobalMenu from "../Dialogue/GlobalMenu";

export default function PersonalInfo(props) {
  const { state, handle } = props;
  const [anchorGlobalMenu, setAnchorGlobalMenu] = React.useState(null);

  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={state.avatar}>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={state.profile.userName}
          secondary={state.profile.email}
        />
        <IconButton
          onClick={(event) => setAnchorGlobalMenu(event.currentTarget)}
        >
          <MoreVertIcon />
        </IconButton>
      </ListItem>

      <GlobalMenu
        state={{
          userID: state.userID,
          anchor: anchorGlobalMenu
        }}
        handle={{
          toggleMessageBox: handle.toggleMessageBox,
          toggleEditProfile: handle.toggleEditProfile,
          changeGlobalLang: handle.changeGlobalLang,
          refreshAvatar: handle.refreshAvatar,
          initValue: handle.initValue,
          clearCheck: handle.clearCheck,
          close: () => setAnchorGlobalMenu(null)
        }}
      />
    </List>
  );
}
