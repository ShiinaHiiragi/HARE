import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { PanelContext } from "../Page/Panel";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function Volumn(props) {
  const classes = useStyles();
  const { open, handleClose } = props;
  const context = React.useContext(PanelContext);
  const table = context.lang.popup.volumn.table;

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle>{context.lang.popup.volumn.title}</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ width: "25%" }}>{table.maxUnit}</TableCell>
                <TableCell align="center" style={{ width: "25%" }}>{table.maxPage}</TableCell>
                <TableCell align="center" style={{ width: "25%" }}>{table.maxItem}</TableCell>
                <TableCell align="center" style={{ width: "25%" }}>{table.maxImg}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{context.range.maxUnit}</TableCell>
                <TableCell align="center">{context.range.maxPage}</TableCell>
                <TableCell align="center">{context.range.maxItem}</TableCell>
                <TableCell align="center">{context.range.maxImg}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ width: "25%" }}>{table.recall}</TableCell>
                <TableCell align="center" style={{ width: "25%" }}>{table.image}</TableCell>
                <TableCell align="center" style={{ width: "25%" }}>{table.item}</TableCell>
                <TableCell align="center" style={{ width: "25%" }}>{table.request}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{"64"}</TableCell>
                <TableCell align="center">{"1024 KB"}</TableCell>
                <TableCell align="center">{"32 KB"}</TableCell>
                <TableCell align="center">{"1536 KB"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {context.lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
