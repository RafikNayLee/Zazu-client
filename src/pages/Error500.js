import React from "react";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import zazu from "../images/SVG/indifferent-zazu.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  zazu: {
    width: 200,
    height: 200,
  },
  titleBlock: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
const Error500 = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.titleBlock}>
          <Typography variant="h3" color="secondary">
            Internal Server Error
          </Typography>
        </div>

        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <img className={classes.zazu} src={zazu} alt="zazu" />
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textPrimary">
              There is an error in the application. For some reason , our dear
              Zazu is unable to deliver his reports. We suspect the Hyenas !
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {"Please refresh the page and try again :'("}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Error500;
