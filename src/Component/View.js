import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import { DataGrid } from "@material-ui/data-grid";

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
    padding: theme.spacing(2, 4),
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
  const column = [
    {
      field: "id",
      headerName: "Entry ID",
      flex: 1,
      editable: true
    },
    {
      field: "query",
      headerName: "Question",
      flex: 2,
      editable: true
    },
    {
      field: "key",
      headerName: "Answer",
      width: 700,
      editable: true
    },
    {
      field: "time",
      headerName: "Time Created",
      flex: 1,
      editable: true
    }
  ];

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
        <DataGrid
          className={classes.dataGrid}
          rows={data.itemList}
          columns={column}
          // pageSize={100}
          checkboxSelection
          disableSelectionOnClick
        />
      </Card>
    </div>
  );
}
