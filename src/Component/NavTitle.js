import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({textSpan: {flexGrow: 1}}));

export default function NavTitle(props) {
  const classes = useStyles();
  return (
    <Typography className={classes.titleSpan} variant="h6" noWrap>
      HARE
    </Typography>
  );
}