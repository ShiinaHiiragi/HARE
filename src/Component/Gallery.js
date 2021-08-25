import React from "react";
import clsx from "clsx";
import Skeleton from "@material-ui/lab/Skeleton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import copy from "copy-to-clipboard";
import { PanelContext } from "../Page/Panel";
import { HotKeys } from "react-hotkeys";
import { requestURL, routeIndex, timeFormat } from "../Interface/Constant";

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
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
  button: {
    borderRadius: 0
  },
  cardGrid: {
    padding: theme.spacing(1, 2, 2, 2),
    maxWidth: "9600px"
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 0
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    display: "flex"
  },
  cardContent: {
    flexGrow: 1,
    paddingBottom: 0
  },
  cardFill: {
    backgroundColor: theme.palette.grey[400]
  },
  addNew: {
    zIndex: 2
  }
}));

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1280,
      lg: 1920,
      xl: 2560,
    },
  },
})

const keyMap = {
  backToMenu: "esc",
};

export default function Gallery(props) {
  const classes = useStyles();
  const { state, handle } = props;
  const context = React.useContext(PanelContext);
  const inputRef = React.createRef();
  const keyHandler = {
    backToMenu: () => handle.setCurrentRoute(routeIndex.cover),
  };

  const imageURL = (id) => `${requestURL}/src/cover` +
    `?unitID=${state.unitID}&pageID=${state.pageID}&imageID=${id}`;
  const copyLink = (imageID) => {
    if (copy(`![](${imageURL(imageID)})`)) {
      handle.toggleMessageBox(context.lang.message.copyImageLink, "info");
    }
  }

  const uploadImage = (event) => {
    console.log(event);
    // clear the value in advance of repeating
    inputRef.current.value = null;
  }

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
        <div style={{ flexGrow: 1 }}/>
        <Typography variant="subtitle2" color="textSecondary">
          {`${state.image.length} / ${state.range.maxImg}`}
          {"　"}
        </Typography>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
          <ThemeProvider theme={theme}>
            {state.image.map((item) => (
              <Grid item key={item.title} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={imageURL(item.id)}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="subtitle1">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {`${item.size} KB`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {timeFormat(
                        new Date(item.time),
                        context.lang.panel.gallery.timeFormatString
                      )}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="secondary">
                      {context.lang.panel.gallery.delete}
                    </Button>
                    <div style={{ flexGrow: 1 }}></div>
                    <Button size="small" color="primary">
                      {context.lang.panel.gallery.rename}
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => copyLink(item.id)}
                    >
                      {context.lang.panel.gallery.copy}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            {(state.image.length < state.range.maxImg) && <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card className={classes.card}>
                <CardMedia
                  className={clsx(classes.cardMedia, classes.cardFill)}
                  children={<div />}
                />
                <CardContent className={classes.cardContent}>
                  <Skeleton variant="text" animation={false} style={{ width: "50%" }} />
                  <Skeleton variant="text" animation={false} style={{ width: "25%" }} />
                  <Skeleton variant="text" animation={false} style={{ width: "75%" }}/>
                </CardContent>
                <CardActions>
                  <div style={{ flexGrow: 1 }}></div>
                  <Button size="small" color="primary" component="label">
                    {context.lang.panel.gallery.new}
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      onChange={uploadImage}
                      hidden
                    />
                  </Button>
                </CardActions>
              </Card>
            </Grid>}
          </ThemeProvider>
        </Grid>
      </Container>
    </HotKeys>
  );
}
