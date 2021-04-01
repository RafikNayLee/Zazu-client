import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";

import axios from "axios";
import useForm from "../utils/useForm";
import { useGeneralContext } from "../utils/GeneralContext";
import { handleError } from "../utils/handleError";
import Footer from "../components/Footer";

import zazu from "../images/SVG/proud-zazu.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    backgroundColor: theme.palette.primary.light,
    height: `100vh`,
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
  imageContainer: {
    position: "relative",
  },
  welcome: {
    margin: theme.spacing(1),
    zIndex: 1,
  },
  zazu: {
    width: 200,
    height: 200,
    position: "absolute",
    top: 25,
    right: 0,
    zIndex: 0,
  },
}));

const Login = () => {
  const classes = useStyles();
  const {
    state,
    dispatch,
    ACTION_TYPES,
    setLoading,
    setErrors,
  } = useGeneralContext();

  const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
    email: "",
    password: "",
  });

  const errors = state.errors;
  function loginUserCallBack() {
    setErrors({});
    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_BACKEND_API_URL}/login`, {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        setLoading(false);
        dispatch({
          type: ACTION_TYPES.LOGIN,
          payload: res.data,
        });
      })
      .catch((err) => {
        setLoading(false);
        handleError({ setErrors })(err);
      });
  }

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div className={classes.imageContainer}>
                <Slide in={true} direction="right">
                  <div className={classes.welcome}>
                    <Typography variant="caption" color="secondary">
                      You must login so that Zazu can recognize you
                    </Typography>
                  </div>
                </Slide>
                <Slide in={true} direction="up">
                  <img className={classes.zazu} src={zazu} alt="zazu" />
                </Slide>
              </div>
            </Grid>
            <Grid item xs>
              <form className={classes.form} onSubmit={onSubmit} noValidate>
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
                  Login
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Typography
            variant="caption"
            color="primary"
            component={Link}
            to="/register"
          >
            You have no account yet ? click here to register
          </Typography>
        </Paper>
      </div>
      <Footer />
    </>
  );
};

export default Login;
