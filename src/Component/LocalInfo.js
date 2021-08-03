import React from "react";
import IconButton from "@material-ui/core/IconButton";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChangeCover from "../Dialogue/ChangeCover";
import { PanelContext } from "../Page/Panel";

export default function LocalInfo(props) {
  const { lang, userID, current, handle } = props;
  const [changeCover, setChangeCover] = React.useState(false);
  const context = React.useContext(PanelContext);

  const submit = (index) => {
    context.request("POST/set/cover", {
      userID: userID,
      unitID: current.unitID,
      pageID: current.pageID,
      cover: index
    }).then(() => {
      handle.setList((list) => list.map((item) => item.unitID === current.unitID
        ? {
          ...item,
          pages: item.pages.map((subItem) => subItem.pageID === current.pageID
            ? { ...subItem, pageCover: index, route: current.route } : subItem)
        } : item))
    });
  }

  return (
    <div>
      <IconButton color="inherit" onClick={() => setChangeCover(true)}>
        <InfoOutlinedIcon />
      </IconButton>
      <ChangeCover
        lang={lang}
        open={changeCover}
        cover={current.pageCover}
        handleClose={() => setChangeCover(false)}
        handleChange={submit}
      />
    </div>
  );
}
