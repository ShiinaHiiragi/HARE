import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  },
  tableField: {
    marginBottom: theme.spacing(2)
  }
}));

export default function Shortcut(props) {
  const classes = useStyles();
  const { lang, open, handleClose } = props;
  const table = lang.popup.shortcut.table;

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle>{lang.popup.shortcut.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {Object.keys(table).map((item) => (
            <div key={item}>
              <Typography align="center">
                {item}
              </Typography>
              <TableContainer className={classes.tableField}>
                <Table size="small">
                  <TableBody>
                    {Object.keys(table[item]).map((subItem) => (
                      <TableRow key={subItem} >
                        <TableCell
                          align="right"
                          style={{ width: "45%", border: 0, fontSize: "0.92rem" }}
                        >
                          {subItem.split("+").map((item, index) => (
                          <span>{index ? " + " : ""}<kbd>{item}</kbd></span>  
                        ))}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ width: "55%", border: 0, fontSize: "0.92rem" }}
                        >
                          {table[item][subItem]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
