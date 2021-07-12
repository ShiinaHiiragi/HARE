import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import { defaultColumn } from "../Interface/Constant";
import { XGrid, GridToolbar } from "@material-ui/x-grid";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  buttonField: {
    margin: theme.spacing(2, 2, 1, 2),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardField: {
    flexGrow: 1,
    borderRadius: "0",
    margin: theme.spacing(1, 2, 2, 2),
    display: "flex",
    flexDirection: "column"
  },
  button: {
    borderRadius: 0
  },
  dataGrid: {
    borderRadius: 0
  }
}));

export default function View(props) {
  const classes = useStyles();
  const { lang, current, data, handle } = props;
  const [column, setColumn] = React.useState(defaultColumn(lang.grid));

  React.useEffect(() => {
    if (data.itemList.length) {
      setColumn(defaultColumn(lang.grid).concat(
        new Array(Object.keys(data.itemList[0]).length - 4)
          .fill().map((_, index) => ({
            field: `${index + 1}`,
            headerName: lang.grid.ordinal[index],
            width: 120,
            editable: false
          }))
      ))
    } else setColumn(defaultColumn(lang.grid));
  }, [lang, data.itemList]);

  return (
    <div className={classes.root}>
      <div className={classes.buttonField}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackOutlinedIcon />}
          className={classes.button}
          onClick={() => handle.setCurrentRoute(1)}
        >
          {lang.common.back}
        </Button>
      </div>
      <Card className={classes.cardField}>
        <XGrid
          className={classes.dataGrid}
          rows={data.itemList}
          columns={column}
          disableColumnMenu
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Card>
    </div>
  );
}
