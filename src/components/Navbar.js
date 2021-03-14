import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";

import RssFeedIcon from "@material-ui/icons/RssFeed";
import HomeIcon from "@material-ui/icons/Home";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import AddIcon from "@material-ui/icons/Add";

import { useGeneralContext } from "../utils/GeneralContext";
import { Link } from "react-router-dom";
import zazu from "../images/SVG/zazu.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  zazu: {
    width: 50,
    height: 50,
    margin: theme.spacing(1),
  },
  content: {
    position: "relative",
    width: `100%`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingTop: 70,
  },
}));

const Navbar = ({ children }) => {
  const { state, dispatch, ACTION_TYPES } = useGeneralContext();
  const classes = useStyles();

  const logout = () => {
    dispatch({
      type: ACTION_TYPES.LOGOUT,
    });
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <ToolBar>
          <div className={classes.zazu}>
            <img src={zazu} alt="zazu" />
          </div>
          <Typography className={classes.title} color="primary" variant="h6">
            Zazu!
          </Typography>
          {state.user && (
            <div>
              <IconButton component={Link} to="/">
                <Tooltip title="Home">
                  <HomeIcon color="primary" />
                </Tooltip>
              </IconButton>
              <IconButton component={Link} to="/news">
                <Tooltip title="News Sources">
                  <RssFeedIcon color="primary" />
                </Tooltip>
              </IconButton>
            </div>
          )}
          <div>
            {!state.user && (
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            )}
            {!state.user && (
              <Button
                variant="text"
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>
            )}
            {state.user && (
              <IconButton onClick={logout}>
                <Tooltip title="Logout">
                  <MeetingRoomIcon color="primary" />
                </Tooltip>
              </IconButton>
            )}
          </div>
        </ToolBar>
      </AppBar>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Navbar;
