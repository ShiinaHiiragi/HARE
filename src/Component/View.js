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
import { packedPOST } from "../Interface/Request";
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
  const { lang, current, data, handle } = props;

  const [column, setColumn] = React.useState(defaultColumn(lang.grid));
  const [invalidDelete, setInvalidDelete] = React.useState(true);
  const [invalidMove, setInvalidMove] = React.useState(true);
  const [changeTrack, setChangeTrack] = React.useState(false);
  const [apiItemID, setApiItemID] = React.useState(0);
  const [apiTrackID, setApiTrackID] = React.useState(0);
  const [apiValue, setApiValue] = React.useState(null);

  const [newItem, setNewItem] = React.useState(false);
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
    if (itemSize === data.itemList.length) {
      if (column.length > 4)
        setDeleteTrack("track");
      else setDeleteTrack("all");
    } else if (itemSize) setDeleteTrack("part");
    else return;
    setDeleteConfirm(true);
  }

  const deleteItem = () => {
    const itemID = [...apiRef.current.getSelectedRows().keys()];
    packedPOST({
      uri: "/set/delete-item",
      query: {
        userID: data.userID,
        unitID: current.unitID,
        pageID: current.pageID,
        itemID: itemID,
        track: deleteTrack === "track"
      },
      msgbox: handle.toggleMessageBox,
      kick: handle.toggleKick,
      lang: lang
    }).then(() => {
      handle.setItemList(() => {
        let remain = new Array(data.itemList.length).fill().map((_, index) => index + 1);
        remain = itemID.reduce((current, item, index) => {
          current.splice(item - index - 1, 1);
          return current;
        }, remain);
        return remain.map((item, index) => ({
          ...data.itemList[item - 1],
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

  // TODO: edit grid on double click
  React.useEffect(() => {
    return apiRef.current.subscribeEvent("cellDoubleClick", (params) => {
      if (!isNaN(Number(params.field))) {
        setApiItemID(params.id);
        setApiTrackID(Number(params.field));
        setApiValue(params.formattedValue);
        setChangeTrack(true);
      }
    });
  }, [apiRef]);

  React.useEffect(() => {
    return apiRef.current.subscribeEvent("selectionChange", (params) => {
      setInvalidDelete(params.length === 0);
      setInvalidMove(data.itemList.length < 2 || params.length !== 1);
    });
  }, [apiRef, data.itemList.length]);

  React.useEffect(() => {
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
          onClick={() => handle.setCurrentRoute(routeIndex.cover)}
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
          style={{ borderRadius: 0 }}
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
          setPageDetail: handle.setPageDetail,
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
      <DeleteConfirm
        lang={lang}
        open={deleteConfirm}
        type="item"
        name={lang.popup.delete[deleteTrack]}
        handleClose={() => setDeleteConfirm(false)}
        handleDeleteTarget={deleteItem}
      />
      <ChangeTrack
        lang={lang}
        open={changeTrack}
        data={{
          token: data.token,
          userID: data.userID,
          unitID: current.unitID,
          pageID: current.pageID,
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
