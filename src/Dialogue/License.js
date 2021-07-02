import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function License(props) {
  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle >
        {`MIT License Copyright ${new Date().getFullYear()} HARE`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Permission is hereby granted, free of charge, to any person
          obtaining a copy of this software and associated documentation
          files (the "Software"), to deal in the Software without
          restriction, including without limitation the rights to use, copy,
          modify, merge, publish, distribute, sublicense, and/or sell copies
          of the Software, and to permit persons to whom the Software is
          furnished to do so, subject to the following conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
          HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
          WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
          DEALINGS IN THE SOFTWARE.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          {props.lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}