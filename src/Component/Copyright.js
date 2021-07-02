import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Copyright(props) {
  return (
    <Box mt={5}>
      <Typography variant="body2" color="textSecondary" align="center">
        {`${props.lang.signIn.copyright} ©`}
        <Link color="inherit" href="#!">
          HARE
        </Link>
        {` ${new Date().getFullYear()}`}
      </Typography>
    </Box>
  );
}
