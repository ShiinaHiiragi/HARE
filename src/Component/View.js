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
import { defaultColumn, routeIndex } from "../Interface/Constant";
import NewItem from "../Dialogue/NewItem";
import Move from "../Dialogue/Move";
import DeleteConfirm from "../Dialogue/DeleteConfirm";
import ChangeTrack from "../Dialogue/ChangeTrack";
import { PanelContext } from "../Page/Panel";
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
  cancelSelected: "esc",
  deleteSelected: "del",
  newItem: "ctrl+c",
  moveItem: "ctrl+m"
};

export default function View(props) {
  const classes = useStyles();
  const apiRef = useGridApiRef();
  const { state, handle } = props;
  const context = React.useContext(PanelContext);

  const [column, setColumn] = React.useState(defaultColumn(context.lang.grid));
  const [invalidDelete, setInvalidDelete] = React.useState(true);
  const [invalidMove, setInvalidMove] = React.useState(true);
  const [changeTrack, setChangeTrack] = React.useState(false);
  const [apiItemID, setApiItemID] = React.useState(0);
  const [apiTrackID, setApiTrackID] = React.useState(0);
  const [apiValue, setApiValue] = React.useState(null);

  const [newItem, setNewItem] = React.useState(false);
  const [editItem, setEditItem] = React.useState(false);
  const [move, setMove] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const [deleteTrack, setDeleteTrack] = React.useState("part");
  const [itemSelect, setItemSelect] = React.useState(0);
  const toggleMove = () => {
    const selectedList = [...apiRef.current.getSelectedRows().keys()];
    if (selectedList.length !== 1) return;
    const selected = selectedList[0];
    setItemSelect(selected);
    setMove(true);
  }
  const toggleDeleteComfirm = () => {
    const itemSize = apiRef.current.getSelectedRows().size;
    if (itemSize === state.itemList.length) {
      if (column.length > 4)
        setDeleteTrack("track");
      else setDeleteTrack("all");
    } else if (itemSize) setDeleteTrack("part");
    else return;
    setDeleteConfirm(true);
  }

  const deleteItem = () => {
    const itemID = [...apiRef.current.getSelectedRows().keys()];
    context.request("POST/delete/item", {
      unitID: state.current.unitID,
      pageID: state.current.pageID,
      itemID: itemID
    }).then(() => {
      handle.setItemList(() => {
        let remain = new Array(state.itemList.length).fill().map((_, index) => index + 1);
        remain = itemID.reduce((current, item, index) => {
          current.splice(item - index - 1, 1);
          return current;
        }, remain);
        return remain.map((item, index) => ({
          ...state.itemList[item - 1],
          id: index + 1
        }))
      });
      handle.setPageDetail((pageDetail) => ({
        ...pageDetail,
        itemSize: pageDetail.itemSize - itemID.length,
        trackSize: deleteTrack === "track" ? 0 : pageDetail.trackSize
      }))
      setDeleteConfirm(false);
      apiRef.current.selectRows(apiRef.current.getAllRowIds(), false);
    });
  }

  const keyHandler = {
    cancelSelected: () => {
      if (apiRef.current.getSelectedRows().size)
        apiRef.current.selectRows(apiRef.current.getAllRowIds(), false);
      else handle.setCurrentRoute(routeIndex.cover);
    },
    newItem: (event) => {
      event.preventDefault();
      setEditItem(false);
      setNewItem(true);
    },
    moveItem: toggleMove,
    deleteSelected: toggleDeleteComfirm
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
          onClick={toggleDeleteComfirm}
        >
          {context.lang.grid.buttons.delete}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          disabled={invalidMove}
          startIcon={<HeightIcon />}
          className={classes.innerButton}
          onClick={toggleMove}
        >
          {context.lang.grid.buttons.move}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          disabled={state.pageDetail.itemSize >= state.range.maxItem}
          startIcon={<AddIcon />}
          className={classes.innerButton}
          onClick={() => { setEditItem(false); setNewItem(true); }}
        >
          {context.lang.grid.buttons.newItem}
        </Button>
      </GridToolbarContainer>
    );
  }

  React.useEffect(() => {
    return apiRef.current.subscribeEvent("cellDoubleClick", (params) => {
      setApiItemID(params.id);
      setApiValue(params.value);
      if (!isNaN(Number(params.field))) {
        setApiTrackID(Number(params.field));
        setChangeTrack(true);
      } else if (params.field === "query" || params.field === "key") {
        setEditItem(params.field);
        setNewItem(true);
      } else if (params.field === "id") toggleMove();
    });
  }, [apiRef]);

  React.useEffect(() => {
    return apiRef.current.subscribeEvent("selectionChange", (params) => {
      setInvalidDelete(params.length === 0);
      setInvalidMove(state.itemList.length < 2 || params.length !== 1);
    });
  }, [apiRef, state.itemList.length]);

  React.useEffect(() => {
    function TrackSelector(props) {
      const { item, applyValue } = props;
      const handleFilterChange = (event) => {
        applyValue({ ...item, value: event.target.value });
      };
  
      return (
        <FormControl variant="standard">
          <InputLabel>{context.lang.grid.inherent.filterPanelInputLabel}</InputLabel>
          <Select value={item.value || ""} onChange={handleFilterChange}>
            <MenuItem value="">{context.lang.grid.inherent.filterValueAny}</MenuItem>
            <MenuItem value="P">{context.lang.grid.inherent.filterValuePure}</MenuItem>
            <MenuItem value="F">{context.lang.grid.inherent.filterValueFar}</MenuItem>
            <MenuItem value="L">{context.lang.grid.inherent.filterValueLost}</MenuItem>
          </Select>
        </FormControl>
      );
    }

    if (state.itemList.length) {
      setColumn(
        defaultColumn(context.lang.grid).concat(
          new Array(Object.keys(state.itemList[0]).length - 4)
            .fill()
            .map((_, index) => ({
              field: `${index + 1}`,
              headerName: context.lang.grid.ordinal[index],
              renderCell: (param) => {
                if (param.value === "P") return <RadioButtonUncheckedIcon />;
                else if (param.value === "F") return <CloseIcon />;
                else return <ChangeHistoryIcon />;
              },
              filterOperators: [
                {
                  label: context.lang.grid.inherent.filterOperatorIs,
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
    } else setColumn(defaultColumn(context.lang.grid));
  }, [context.lang, state.itemList]);

  return (
    <HotKeys keyMap={keyMap} handlers={keyHandler} className={classes.root}>
      <div tabIndex={-1} className={classes.buttonField}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackOutlinedIcon />}
          className={classes.button}
          onClick={() => handle.setCurrentRoute(routeIndex.cover)}
        >
          {context.lang.common.back}
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
          {context.lang.grid.buttons.export}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          disabled={invalidDelete}
          startIcon={<CheckCircleOutlinedIcon />}
          className={classes.button}
          onClick={() => {
            handle.setRecollect(true);
            handle.setTimerInitial((lastValue) => [0, lastValue[1] + 1]);
            handle.setRecall({
              pure: [], far: [],
              lost: [...apiRef.current.getSelectedRows().keys()]
            });
            handle.setCurrentRoute(routeIndex.recall);
          }}
        >
          {context.lang.grid.buttons.recollect}
        </Button>
      </div>
      <Card className={classes.cardField}>
        <XGrid
          localeText={context.lang.grid.inherent}
          rows={state.itemList}
          columns={column}
          disableColumnMenu
          components={{ Toolbar: InnerToolbar }}
          columnBuffer={16}
          apiRef={apiRef}
          style={{ borderRadius: 0 }}
        />
      </Card>
      <NewItem
        open={newItem}
        state={{
          editItem: editItem,
          apiItemID: apiItemID,
          apiValue: apiValue,
          unitID: state.current.unitID,
          pageID: state.current.pageID,
          trackSize: state.pageDetail.trackSize,
          listLength: state.itemList.length
        }}
        handle={{
          close: () => setNewItem(false),
          toggleMessageBox: handle.toggleMessageBox,
          toggleKick: handle.toggleKick,
          setPageDetail: handle.setPageDetail,
          setItemList: handle.setItemList
        }}
      />
      <Move
        open={move}
        state={{
          listLength: state.itemList.length,
          unitID: state.current.unitID,
          pageID: state.current.pageID,
          select: itemSelect
        }}
        handle={{
          close: () => setMove(false),
          toggleMessageBox: handle.toggleMessageBox,
          toggleKick: handle.toggleKick,
          setItemList: handle.setItemList
        }}
      />
      <DeleteConfirm
        open={deleteConfirm}
        type="item"
        name={context.lang.popup.delete[deleteTrack]}
        handleClose={() => setDeleteConfirm(false)}
        handleDeleteTarget={deleteItem}
      />
      <ChangeTrack
        open={changeTrack}
        state={{
          unitID: state.current.unitID,
          pageID: state.current.pageID,
          itemID: apiItemID,
          trackID: apiTrackID,
          value: apiValue
        }}
        handle={{
          close: () => setChangeTrack(false),
          toggleMessageBox: handle.toggleMessageBox,
          toggleKick: handle.toggleKick,
          setItemList: handle.setItemList
        }}
      />
    </HotKeys>
  );
}
