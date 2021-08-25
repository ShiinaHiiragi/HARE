import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
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
  },
  cardContent: {
    flexGrow: 1,
    paddingBottom: 0
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
};

export default function Gallery(props) {
  const classes = useStyles();
  const { state, handle } = props;
  const context = React.useContext(PanelContext);

  const [image, setImage] = React.useState([
    { id: 1, title: "LONG TITLE", time: "2021-08-24T09:12:21.020Z", size: 861244 },
    { id: 2, title: "TITLE", time: "2021-08-24T09:12:21.020Z", size: 86144 },
    { id: 3, title: "TITLE", time: "2021-08-24T09:12:21.020Z", size: 23864 },
    { id: 4, title: "TITLE", time: "2021-08-24T09:12:21.020Z", size: 84 },
    { id: 5, title: "TITLE", time: "2021-08-24T09:12:21.020Z", size: 1864 },
    { id: 6, title: "TITLE", time: "2021-08-24T09:12:21.020Z", size: 8364 },
    { id: 7, title: "TITLE", time: "2021-08-24T09:12:21.020Z", size: 864 },
    { id: 8, title: "TITLE", time: "2021-08-24T09:12:21.020Z", size: 4 }
  ]);

  const keyHandler = {
  };

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
          {`${image.length} / ${state.range.maxImg}`}
          {"　"}
        </Typography>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
          <ThemeProvider theme={theme}>
            {image.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`${requestURL}/src/cover`}
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
                    <Button size="small" color="primary">
                      {context.lang.panel.gallery.rename}
                    </Button>
                    <Button size="small" color="primary">
                      {context.lang.panel.gallery.copy}
                    </Button>
                    <div style={{ flexGrow: 1 }}></div>
                    <Button size="small" color="secondary">
                      {context.lang.panel.gallery.delete}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </ThemeProvider>
        </Grid>
      </Container>
    </HotKeys>
  );
}
