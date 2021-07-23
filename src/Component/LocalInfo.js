import React from "react";
import IconButton from "@material-ui/core/IconButton";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChangeCover from "../Dialogue/ChangeCover";

export default function LocalInfo(props) {
  const { lang } = props;
  const [changeCover, setChangeCover] = React.useState(false);

  return (
    <div>
      <IconButton color="inherit" onClick={() => setChangeCover(true)}>
        <InfoOutlinedIcon />
      </IconButton>
      <ChangeCover
        lang={lang}
        open={changeCover}
        handleClose={() => setChangeCover(false)}
      />
    </div>
  );
}
