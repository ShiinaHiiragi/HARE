import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import copy from "copy-to-clipboard";
import { author, version, email, requestURL } from "../Interface/Constant";
import { PanelContext } from "../Page/Panel";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  },
  title: {
    paddingBottom: 0
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  author: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1, 0)
  },
  info: {
    marginLeft: theme.spacing(2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  tableField: {
    marginBottom: theme.spacing(1)
  },
  table: {
    width: "100%"
  },
  largeAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12)
  },
  notLargeAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  }
}));

export default function License(props) {
  const classes = useStyles();
  const { withTab, open, handleClose, handleToggleMessageBox } = props;
  const context = React.useContext(PanelContext);

  const [tab, setTab] = React.useState(0);
  const [expand, setExpand] = React.useState(0);
  React.useEffect(() => {
    if (open) {
      setTab(0);
      setExpand(0);
    }
  }, [open]);

  const infoObject = context.lang.popup.about.info;
  const helpObject = context.lang.popup.about.help;

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle style={{ paddingBottom: withTab ? 0 : 16 }}>
        {context.lang.popup.about.title}
        <Typography component="span" variant="body2">
          &ensp;{version}
        </Typography>
      </DialogTitle>
      <Tabs
        value={tab}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        onChange={(_, index) => setTab(index)}
        style={{ display: withTab ? "flex" : "none" }}
      >
        <Tab label={context.lang.popup.about.tab[0]} />
        <Tab label={context.lang.popup.about.tab[1]} />
      </Tabs>
      {(function () {
        if (tab === 0)
          return (
            <DialogContent className={classes.content}>
              <div className={classes.author}>
                <Avatar
                  src={`${requestURL}/src/about`}
                  className={classes.largeAvatar}
                >
                  <PersonIcon className={classes.notLargeAvatar} />
                </Avatar>
                <div className={classes.info}>
                  <Typography variant="subtitle1">{author}</Typography>
                  <Tooltip title={context.lang.popup.about.copyTip}>
                    <Link
                      variant="body2"
                      color="inherit"
                      href="#"
                      onClick={() => {
                        if (copy(email))
                          handleToggleMessageBox(
                            context.lang.message.copyEmail,
                            "info"
                          );
                      }}
                    >
                      {email}
                    </Link>
                  </Tooltip>
                </div>
              </div>
              {withTab && (
                <TableContainer className={classes.tableField}>
                  <Table className={classes.table} size="small">
                    <TableHead>
                      <TableRow>
                        {context.lang.popup.about.header.map((item, index) => (
                          <TableCell
                            align={index < 2 ? "left" : "right"}
                            key={index}
                          >
                            {item}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(infoObject).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row" align="left">
                            {item}
                          </TableCell>
                          <TableCell align="left">
                            {infoObject[item][0]}
                          </TableCell>
                          <TableCell align="right">
                            {infoObject[item][1]}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </DialogContent>
          );
        else
          return (
            <DialogContent>
              {Object.keys(helpObject).map((item, index) => (
                <Accordion
                  key={index}
                  expanded={expand === index}
                  onChange={() => setExpand(index)}
                  square
                  variant="outlined"
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{item}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ flexDirection: "column" }}>
                    {Object.keys(helpObject[item]).map((subItem, subIndex) => (
                      <div key={subIndex}>
                        <Typography variant="subtitle1">{subItem}</Typography>
                        <DialogContentText>
                          {helpObject[item][subItem]}
                        </DialogContentText>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </DialogContent>
          );
      })()}
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {context.lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
