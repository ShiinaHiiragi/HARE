import React from "react";
import IconButton from "@material-ui/core/IconButton";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChangeCover from "../Dialogue/ChangeCover";
import { PanelContext } from "../Page/Panel";

export default function LocalInfo(props) {
  const { current, handleSetList } = props;
  const [changeCover, setChangeCover] = React.useState(false);
  const context = React.useContext(PanelContext);

  const submit = (index) => {
    context.request("POST/set/cover", {
      unitID: current.unitID,
      pageID: current.pageID,
      cover: index
    }).then(() => {
      handleSetList((list) => list.map((item) => item.unitID === current.unitID
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
        open={changeCover}
        cover={current.pageCover}
        handleClose={() => setChangeCover(false)}
        handleSubmit={submit}
      />
    </div>
  );
}
