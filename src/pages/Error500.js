import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import zazu from "../images/SVG/zazu.svg";

const useStyles = makeStyles((theme) => ({
  zazu: {
    width: 200,
    height: 200,
  },
  title: {
    margin: "auto",
  },
}));
const Error500 = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.title}>
        <Typography variant="h3" color="error">
          Internal Server Error
        </Typography>
      </div>

      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item>
          <img className={classes.zazu} src={zazu} alt="zazu" />
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textPrimary">
            There is an error in the application. For some reason , our dear
            Zazu is unable to deliver his reports. We suspect the Hyenas !
          </Typography>
          <Typography variant="body1" color="textPrimary">
            Please refresh the page and try again.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Error500;
