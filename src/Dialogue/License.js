import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  },
  title: {
    paddingBottom: 0
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default function License(props) {
  const { lang, open, handleClose } = props;
  const classes = useStyles();
  const [tab, setTab] = React.useState(0);
  const infoObject = lang.popup.about.info;
  const helpObject = lang.popup.about.help;

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle className={classes.title}>
        {lang.popup.about.title}
      </DialogTitle>
      <Tabs
        value={tab}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        onChange={(_, index) => setTab(index)}
      >
        <Tab label={lang.popup.about.tab[0]} />
        <Tab label={lang.popup.about.tab[1]} />
      </Tabs>
      {(function() {
        if (tab === 0) return (
          <DialogContent>
            lang.popup.about.info
          </DialogContent>
        );
        else return (
          <DialogContent>
            {Object.keys(helpObject).map((item) => (
              <Accordion square variant="outlined">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    {item}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ flexDirection: "column" }}>
                  {Object.keys(helpObject[item]).map((subItem) => (
                    <div>
                      <Typography variant="subtitle1">
                        {subItem}
                      </Typography>
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
          {lang.common.back}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
