import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import { useGeneralContext } from "../utils/GeneralContext";
import { Link } from "react-router-dom";
import zazu from "../images/SVG/zazu.svg";

import icons from "./icons";
import QuickActions from "./QuickActions";

import axios from "axios";
import checkRequests from "../utils/CheckRequests";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // maxHeight: "500px",
    // direction: "column",
  },
  toolBar: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  loginArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },
  title: {
    position: "absolute",
    top: 5,
    right: -20,
  },
  zazu: {
    width: 50,
    height: 50,
    margin: theme.spacing(1),
  },
  spaceHolder: {
    display: "block",
    height: 65,
  },
  content: {
    position: "relative",
    width: `100%`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  navigation: {
    position: "fixed",
    bottom: theme.spacing(0),
    width: "100%",
  },
  loading: {
    position: "fixed",
    top: 65,
    width: "100%",
    zIndex: theme.zIndex.appBar + 1000,
  },
}));

const Navbar = (props) => {
  const { state, dispatch, ACTION_TYPES } = useGeneralContext();
  const classes = useStyles();
  const [route, setRoute] = useState("/");
  const { children } = props;
  useEffect(() => {
    state.user && props.history.push(route);
  }, [route]);

  const logout = () => {
    dispatch({
      type: ACTION_TYPES.LOGOUT,
    });
  };

  const loadFeeds = () => {
    if (state && state.user) {
      dispatch({
        type: ACTION_TYPES.LOADING,
        payload: true,
      });
      axios
        .get(`${process.env.REACT_APP_BACKEND_API_URL}/loadFeeds`, {
          headers: {
            "x-access-token": state.user.token,
          },
        })
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.LOADING,
            payload: false,
          });
          dispatch({
            type: ACTION_TYPES.FEEDS,
            payload: [...state.feeds, ...res.data],
          });
        })

        .catch((err) => {
          dispatch({
            type: ACTION_TYPES.LOADING,
            payload: false,
          });
        });
    }
  };
  return (
    <div className={classes.root}>
      <AppBar color="inherit">
        <ToolBar className={classes.toolBar}>
          <div className={classes.logoArea}>
            <div className={classes.zazu}>
              <img src={zazu} alt="zazu" />
            </div>
            <Typography
              className={classes.title}
              color="secondary"
              variant="h6"
            >
              Zazu!
            </Typography>
          </div>

          {state.user && (
            <IconButton onClick={loadFeeds}>
              <Tooltip title="Synchronize App">
                {icons.loadFeeds({ color: "secondary" })}
              </Tooltip>
            </IconButton>
          )}

          {!state.user ? (
            <div className={classes.loginArea}>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/register"
              >
                Register
              </Button>
              <Button
                variant="text"
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>
            </div>
          ) : (
            <IconButton onClick={logout}>
              <Tooltip title="Logout">
                {icons.logout({ color: "primary" })}
              </Tooltip>
            </IconButton>
          )}
        </ToolBar>
      </AppBar>
      <div className={classes.spaceHolder}></div>
      {state.loading && (
        <LinearProgress className={classes.loading} color="primary" />
      )}
      <main className={classes.content}>
        {children}
        {state.user && <QuickActions />}
      </main>
      <div className={classes.spaceHolder}></div>
      {state.user && (
        <div className={classes.navigation}>
          <Divider />
          <BottomNavigation
            value={route}
            onChange={(event, newValue) => {
              setRoute(newValue);
            }}
            showLabels
          >
            <BottomNavigationAction
              value="/"
              label="Home"
              icon={icons.home({ color: "primary" })}
            />
            <BottomNavigationAction
              value="/news"
              label="News Sources"
              icon={icons.news({ color: "primary" })}
            />
            <BottomNavigationAction
              value="/categories"
              label="Categories"
              icon={icons.categories({ color: "primary" })}
            />
          </BottomNavigation>
        </div>
      )}
    </div>
  );
};

export default checkRequests(Navbar);
