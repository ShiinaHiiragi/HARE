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
import { requestURL, routeIndex } from "../Interface/Constant";

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
  }
}));

const keyMap = {
};
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Gallery(props) {
  const classes = useStyles();
  const { state, handle } = props;
  const context = React.useContext(PanelContext);

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
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={`${requestURL}/src/cover`}
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="body2">
                    Uploaded at yesterday
                  </Typography>
                  <Typography variant="body2">
                    Size: 864 KB
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Copy Link
                  </Button>
                  <div style={{ flexGrow: 1 }}></div>
                  <Button size="small" color="secondary">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </HotKeys>
  );
}
