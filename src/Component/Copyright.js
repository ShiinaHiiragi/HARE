import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import License from "../Dialogue/License";

export default function Copyright(props) {
  // the license information popup
  const [licenseDialogue, setLicenseDialogue] = React.useState(false);
  const toggleLicenseDialogue = () => setLicenseDialogue(true);
  const closeLicenseDialogue = () => setLicenseDialogue(false);

  return (
    <Box mt={5}>
      <Typography variant="body2" color="textSecondary" align="center">
        {`${props.lang.signIn.copyright} ©`}
        <Link color="inherit" href="#" onClick={toggleLicenseDialogue}>
          HARE
        </Link>
        {` ${new Date().getFullYear()}`}
      </Typography>
      <License
        lang={props.lang}
        open={licenseDialogue}
        handleClose={closeLicenseDialogue}
      />
    </Box>
  );
}
