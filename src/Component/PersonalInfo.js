import React from "react";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import requestURL from "../Interface/Constant";
import GlobalMenu from "../Dialogue/GlobalMenu";
import { randomTimestamp } from "../Interface/Constant";

export default function PersonalInfo(props) {
  const { lang, data, handle } = props;
  const [anchorGlobalMenu, setAnchorGlobalMenu] = React.useState(null);
  const [avatarURL, setAvatarURL] = React.useState(
    `${requestURL}/src/avatar?userID=${data.userID}&token=${data.token}`
  );
  const refreshAvatar = () => setAvatarURL(
    `${requestURL}/src/avatar?userID=${data.userID}&token=${data.token}&t=${randomTimestamp()}`
  );

  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={avatarURL}>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={data.profile.userName}
          secondary={data.profile.email}
        />
        <IconButton
          onClick={(event) => setAnchorGlobalMenu(event.currentTarget)}
        >
          <MoreVertIcon />
        </IconButton>
      </ListItem>

      <GlobalMenu
        lang={lang}
        data={{
          userID: data.userID,
          token: data.token,
        }}
        anchor={anchorGlobalMenu}
        handle={{
          toggleMessageBox: handle.toggleMessageBox,
          toggleKick: handle.toggleKick,
          close: () => setAnchorGlobalMenu(null),
          changeGlobalLang: handle.changeGlobalLang,
          refreshAvatar: refreshAvatar
        }}
        handleClose={() => setAnchorGlobalMenu(null)}
        changeGlobalLang={handle.changeGlobalLang}
      />
    </List>
  );
}
