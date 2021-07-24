import React from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";
import HeightIcon from "@material-ui/icons/Height";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import { defaultColumn } from "../Interface/Constant";
import NewItem from "../Dialogue/NewItem";
import Move from "../Dialogue/Move";
import { HotKeys } from "react-hotkeys";
import {
  XGrid,
  useGridApiRef,
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
    flexDirection: "column"
  },
  buttonField: {
    margin: theme.spacing(2, 2, 1, 2),
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  cardField: {
    flexGrow: 1,
    height: 0,
    borderRadius: "0",
    margin: theme.spacing(1, 2, 2, 2),
    display: "flex",
    flexDirection: "column"
  },
  button: {
    borderRadius: 0
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
      fontSize: "0.825rem"
    },
    "& svg": {
      width: 20,
      height: 20
    }
  }
}));

const keyMap = {
  cancelSelected: "esc"
};

export default function View(props) {
  const classes = useStyles();
  const apiRef = useGridApiRef();
  const { lang, current, data, handle } = props;

  const [column, setColumn] = React.useState(defaultColumn(lang.grid));
  const [invalidDelete, setInvalidDelete] = React.useState(true);
  const [invalidMove, setInvalidMove] = React.useState(true);

  const [newItem, setNewItem] = React.useState(false);
  const [move, setMove] = React.useState(false);
  const [itemSelect, setItemSelect] = React.useState(0);
  const toggleMove = () => {
    const selected = [...apiRef.current.getSelectedRows().keys()][0];
    setItemSelect(selected);
    setMove(true);
  }

  const keyHandler = {
    cancelSelected: () => {
      apiRef.current.selectRows(apiRef.current.getAllRowIds(), false);
    }
  };

  function InnerToolbar() {
    const classes = useStyles();

    return (
      <GridToolbarContainer className={classes.dataGridButton}>
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
          color="secondary"
          disabled={invalidDelete}
          startIcon={<CloseIcon />}
          className={classes.innerButton}
          onClick={() => {}}
        >
          {lang.grid.buttons.delete}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          disabled={invalidMove}
          startIcon={<HeightIcon />}
          className={classes.innerButton}
          onClick={toggleMove}
        >
          {lang.grid.buttons.move}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          className={classes.innerButton}
          onClick={() => setNewItem(true)}
        >
          {lang.grid.buttons.newItem}
        </Button>
      </GridToolbarContainer>
    );
  }

  function TrackSelector(props) {
    const { item, applyValue } = props;
    const handleFilterChange = (event) => {
      applyValue({ ...item, value: event.target.value });
    };

    return (
      <FormControl variant="standard">
        <InputLabel>{lang.grid.inherent.filterPanelInputLabel}</InputLabel>
        <Select value={item.value || ""} onChange={handleFilterChange}>
          <MenuItem value="">{lang.grid.inherent.filterValueAny}</MenuItem>
          <MenuItem value="P">{lang.grid.inherent.filterValuePure}</MenuItem>
          <MenuItem value="F">{lang.grid.inherent.filterValueFar}</MenuItem>
          <MenuItem value="L">{lang.grid.inherent.filterValueLost}</MenuItem>
        </Select>
      </FormControl>
    );
  }

  React.useEffect(() => {
    return apiRef.current.subscribeEvent("cellDoubleClick", (params) => {
      console.log(params);
    });
  }, [apiRef]);

  React.useEffect(() => {
    return apiRef.current.subscribeEvent("selectionChange", (params) => {
      setInvalidDelete(params.length === 0);
      setInvalidMove(data.itemList.length < 2 || params.length !== 1);
    });
  }, [apiRef, data.itemList.length]);

  React.useEffect(() => {
    if (data.itemList.length) {
      setColumn(
        defaultColumn(lang.grid).concat(
          new Array(Object.keys(data.itemList[0]).length - 4)
            .fill()
            .map((_, index) => ({
              field: `${index + 1}`,
              headerName: lang.grid.ordinal[index],
              renderCell: (param) => {
                if (param.value === "P") return <RadioButtonUncheckedIcon />;
                else if (param.value === "F") return <CloseIcon />;
                else return <ChangeHistoryIcon />;
              },
              filterOperators: [
                {
                  label: lang.grid.inherent.filterOperatorIs,
                  value: "is",
                  getApplyFilterFn: (filterItem) => {
                    if (!filterItem.value) return null;
                    else return (param) => param.value === filterItem.value;
                  },
                  InputComponent: TrackSelector
                }
              ],
              width: 120,
              align: "center",
              headerAlign: "center"
            }))
        )
      );
    } else setColumn(defaultColumn(lang.grid));
  }, [lang, data.itemList]);

  return (
    <HotKeys keyMap={keyMap} handlers={keyHandler} className={classes.root}>
      <div tabIndex={-1} className={classes.buttonField}>
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
          disabled={invalidDelete}
          startIcon={<GetAppOutlinedIcon />}
          className={clsx(classes.button, classes.exportButton)}
          onClick={() => {}}
        >
          {lang.grid.buttons.export}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          disabled={invalidDelete}
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
          components={{ Toolbar: InnerToolbar }}
          columnBuffer={16}
          apiRef={apiRef}
        />
      </Card>
      <NewItem
        lang={lang}
        data={{
          userID: data.userID,
          token: data.token,
          unitID: current.unitID,
          pageID: current.pageID
        }}
        state={{
          open: newItem,
          trackSize: data.pageDetail.trackSize,
          listLength: data.itemList.length
        }}
        handle={{
          close: () => setNewItem(false),
          toggleMessageBox: handle.toggleMessageBox,
          toggleKick: handle.toggleKick,
          setItemList: handle.setItemList
        }}
      />
      <Move
        lang={lang}
        open={move}
        data={{
          userID: data.userID,
          listLength: data.itemList.length,
          unitID: current.unitID,
          pageID: current.pageID,
          select: itemSelect
        }}
        handle={{
          close: () => setMove(false),
          toggleMessageBox: handle.toggleMessageBox,
          toggleKick: handle.toggleKick,
          setItemList: handle.setItemList
        }}
      />
    </HotKeys>
  );
}
