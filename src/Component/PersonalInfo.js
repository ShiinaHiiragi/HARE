import React from "react";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import requestURL from "../Interface/URL";
import GlobalMenu from "../Dialogue/GlobalMenu";

export default function PersonalInfo(props) {
  const { lang, data, handle } = props;
  const [anchorGlobalMenu, setAnchorGlobalMenu] = React.useState(null);

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
        <IconButton
          onClick={(event) => setAnchorGlobalMenu(event.currentTarget)}
        >
          <MoreVertIcon />
        </IconButton>
      </ListItem>
      <GlobalMenu
        lang={lang}
        data={data}
        anchor={anchorGlobalMenu}
        handleClose={() => setAnchorGlobalMenu(null)}
        changeGlobalLang={handle.changeGlobalLang}
      />
    </List>
  );
}
