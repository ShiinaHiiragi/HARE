import React from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import HeightIcon from "@material-ui/icons/Height";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { defaultColumn } from "../Interface/Constant";
import {
  XGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector
} from "@material-ui/x-grid";

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
    borderRadius: 0,
  },
  exportButton: {
    margin: theme.spacing(0, 2)
  },
  innerButton: {
    borderRadius: 0,
    margin: theme.spacing(1, 1, 0, 1)
  },
  dataGridButton: {
    borderRadius: 0,
    "& button": {
      padding: theme.spacing(0.5, 1),
      fontSize: "0.825rem",
    },
    "& svg": {
      width: 20,
      height: 20
    }
  }
}));

export default function View(props) {
  const classes = useStyles();
  const { lang, current, data, handle } = props;
  const [column, setColumn] = React.useState(defaultColumn(lang.grid));

  function InnerToolbar() {
    const classes = useStyles();
  
    return (
      <GridToolbarContainer className={classes.dataGridButton} >
        <GridToolbarDensitySelector
          className={classes.innerButton}
          variant="outlined"
        />
        <GridToolbarColumnsButton
          className={classes.innerButton}
          variant="outlined"
        />
        <GridToolbarFilterButton
          className={classes.innerButton}
          variant="outlined"
        />
        <div style={{ flexGrow: 1 }}></div>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CloseIcon />}
          className={classes.innerButton}
          onClick={() => {}}
        >
          {lang.grid.buttons.delete}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<HeightIcon />}
          className={classes.innerButton}
          onClick={() => {}}
        >
          {lang.grid.buttons.move}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          className={classes.innerButton}
          onClick={() => {}}
        >
          {lang.grid.buttons.newItem}
        </Button>
      </GridToolbarContainer>
    );
  }

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
        <div style={{ flexGrow: 1 }}></div>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<GetAppOutlinedIcon />}
          className={clsx(classes.button, classes.exportButton)}
          onClick={() => {}}
        >
          {lang.grid.buttons.export}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CheckCircleOutlinedIcon />}
          className={classes.button}
          onClick={() => {}}
        >
          {lang.grid.buttons.recollect}
        </Button>
      </div>
      <Card className={classes.cardField}>
        <XGrid
          localeText={lang.grid.inherent}
          rows={data.itemList}
          columns={column}
          disableColumnMenu
          components={{
            Toolbar: InnerToolbar,
          }}
          columnBuffer={16}
        />
      </Card>
    </div>
  );
}
