import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  field: {
    margin: theme.spacing(1),
  },
}));

const CustomForm = ({ values, onChange, fieldLabels, errors }) => {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      {Object.keys(values).map((key) => (
        <Grid key={key} item xs>
          <TextField
            autoComplete={"off"}
            type="text"
            className={classes.field}
            onChange={onChange}
            value={values[key]}
            name={key}
            label={fieldLabels[key]}
            helperText={errors[key]}
            error={Boolean(errors[key])}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomForm;
