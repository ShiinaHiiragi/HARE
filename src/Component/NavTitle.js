import Typography from "@material-ui/core/Typography";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({ titleSpan: { flexGrow: 1 } }));

export default function NavTitle(props) {
  const classes = useStyles();
  const { title } = props;
  return (
    <Typography className={classes.titleSpan} variant="h6" noWrap>
      {title}
    </Typography>
  );
}
