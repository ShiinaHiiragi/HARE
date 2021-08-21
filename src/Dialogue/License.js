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
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
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
import copy from "copy-to-clipboard";
import log from "../Language/Log";
import { author, version, email, requestURL, timeFormat } from "../Interface/Constant";
import { PanelContext } from "../Page/Panel";

import withStyles from "@material-ui/core/styles/withStyles";
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
  },
  logs: {
    alignSelf: "flex-start",
    padding: theme.spacing(0, 4),
    width: "100%",
    overflow: "auto"
  },
  log: {
    margin: theme.spacing(1, 0)
  },
  subLog: {
    padding: theme.spacing(0, 2)
  }
}));

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgb(252, 252, 252)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function License(props) {
  const classes = useStyles();
  const { withTab, open, handleClose, handleToggleMessageBox } = props;
  const context = React.useContext(PanelContext);
  const lang = context.lang ?? props.lang

  const [tab, setTab] = React.useState(0);
  const [expand, setExpand] = React.useState(0);
  React.useEffect(() => {
    if (open) {
      setTab(0);
      setExpand(0);
    }
  }, [open]);

  const infoObject = lang.popup.about.info;
  const helpObject = lang.popup.about.help;

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle style={{ paddingBottom: withTab ? 0 : 16 }}>
        {lang.popup.about.title}
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
        <Tab label={lang.popup.about.tab[0]} />
        <Tab label={lang.popup.about.tab[1]} />
        <Tab label={lang.popup.about.tab[2]} />
      </Tabs>
      {(function () {
        if (tab < 2) {
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
                  <Tooltip
                    title={lang.popup.about.copyTip}
                    classes={{ tooltip: classes.noneSelect }}
                  >
                    <Link
                      variant="body2"
                      color="inherit"
                      href="#"
                      onClick={() => {
                        if (copy(email))
                          handleToggleMessageBox(
                            lang.message.copyEmail,
                            "info"
                          );
                      }}
                    >
                      {email}
                    </Link>
                  </Tooltip>
                </div>
              </div>
              {tab === 0 ? (withTab && (
                <TableContainer className={classes.tableField}>
                  <Table className={classes.table} size="small">
                    <TableHead>
                      <TableRow>
                        {lang.popup.about.header.map((item, index) => (
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
              )) : (
                <div className={classes.logs}>
                  {log.map((item, index) => (
                    <div key={index} className={classes.log}>
                      <div>
                        <Typography component="span" variant="subtitle1">
                          {item.version}
                        </Typography>
                        <Typography component="span" variant="subtitle1" color="textSecondary">
                          {" ("}
                          {timeFormat(new Date(item.date), lang.popup.about.timeFormatString)}
                          {")"}
                        </Typography>
                      </div>
                      {item.detail.map((subItem, subIndex) => (
                        <div key={subIndex} className={classes.subLog}>
                          <Typography variant="subtitle2" component="span">
                            {subItem.type}
                          </Typography>
                          {"　"}
                          <Typography variant="body2" component="span">
                            {subItem.content}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </DialogContent>
          );
        }
        else {
          return (
            <DialogContent>
              {Object.keys(helpObject).map((item, index) => (
                <Accordion
                  key={index}
                  expanded={expand === index}
                  onChange={() => setExpand(index)}
                  square
                >
                  <AccordionSummary>
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
        }
      })()}
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
