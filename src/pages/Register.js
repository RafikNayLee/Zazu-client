import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import axios from "axios";
import useForm from "../utils/useForm";
import { useGeneralContext } from "../utils/GeneralContext";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(2, 1),
    margin: "2px auto",
    maxWidth: "500px",
  },

  title: {
    margin: "auto",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  field: {
    margin: theme.spacing(1),
  },
  button: {
    position: "relative",
    margin: `auto`,
  },
  errorText: {
    margin: theme.spacing(1),
  },
  loading: {
    margin: theme.spacing(1),
  },
}));

const Register = () => {
  const classes = useStyles();
  const { state, dispatch, ACTION_TYPES } = useGeneralContext();
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(registerUserCallBack, {
    email: "",
    password: "",
    confirmPassword: "",
  });

  function registerUserCallBack() {
    setErrors({});
    dispatch({
      type: ACTION_TYPES.LOADING,
      payload: true,
    });

    axios
      .post(`${process.env.REACT_APP_BACKEND_API_URL}/register`, {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })
      .then((res) => {
        dispatch({
          type: ACTION_TYPES.LOADING,
          payload: false,
        });
        dispatch({
          type: ACTION_TYPES.LOGIN,
          payload: res.data,
        });
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
        dispatch({
          type: ACTION_TYPES.LOADING,
          payload: false,
        });
      });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <Typography className={classes.title} variant="h3" color="primary">
            Register
          </Typography>
          <TextField
            autoComplete={"off"}
            type="text"
            className={classes.field}
            onChange={onChange}
            value={values.email}
            name="email"
            label="Email"
            helperText={errors["email"]}
            error={Boolean(errors["email"])}
          />
          <TextField
            autoComplete={"off"}
            type="password"
            className={classes.field}
            onChange={onChange}
            value={values.password}
            name="password"
            label="Password"
            helperText={errors["password"]}
            error={Boolean(errors["password"])}
          />
          <TextField
            autoComplete={"off"}
            type="password"
            className={classes.field}
            onChange={onChange}
            value={values.confirmPassword}
            name="confirmPassword"
            label="Password Confirmation"
            helperText={errors["confirmPassword"]}
            error={Boolean(errors["confirmPassword"])}
          />
          {state.loading && (
            <LinearProgress className={classes.loading} color="primary" />
          )}
          {errors.general && (
            <Typography
              className={classes.errorText}
              color="error"
              variant="caption"
            >
              {errors.general}
            </Typography>
          )}
          <Button
            className={classes.button}
            variant="contained"
            onClick={onSubmit}
            type="submit"
            color="primary"
          >
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
