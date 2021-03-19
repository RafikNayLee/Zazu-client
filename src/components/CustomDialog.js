import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import LinearProgress from "@material-ui/core/LinearProgress";

import CloseIcon from "@material-ui/icons/Close";
import FullScreenIcon from "@material-ui/icons/Fullscreen";

import { withStyles, makeStyles } from "@material-ui/core/styles";

const titleStyles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    color: "white",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  subTitle: {
    marginLeft: theme.spacing(2),
  },
}));

export const DefaultTransition = React.forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(titleStyles)(
  ({ children, classes, onClose, onFullScreen, ...other }) => {
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Grid container direction="row" spacing={1}>
          <Grid item xs>
            {children}
          </Grid>
          {onFullScreen ? (
            <Grid item>
              <IconButton aria-label="close" onClick={onFullScreen}>
                <Tooltip title="FullScreen">
                  <FullScreenIcon color="inherit" />
                </Tooltip>
              </IconButton>
            </Grid>
          ) : null}
          {onClose ? (
            <Grid item>
              <IconButton aria-label="close" onClick={onClose}>
                <Tooltip title="Close">
                  <CloseIcon color="inherit" />
                </Tooltip>
              </IconButton>
            </Grid>
          ) : null}
        </Grid>
      </MuiDialogTitle>
    );
  }
);

const CustomDialog = ({
  open,
  handleClose,
  handleSubmit,
  name,
  title,
  subTitle,
  icon,
  children,
  fullScreen: defaultFullScreen,
  loading,
  ...rest
}) => {
  const classes = useStyles();
  const [fullScreen, setFullScreen] = useState(false);

  const onFullScreen = (e) => setFullScreen(!fullScreen);
  useEffect(() => {
    setFullScreen(defaultFullScreen);
  }, [defaultFullScreen]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={`custom-dialog${name}`}
      TransitionComponent={DefaultTransition}
      fullScreen={fullScreen}
      {...rest}
    >
      <DialogTitle
        id={`custom-dialog${name}`}
        onClose={handleClose}
        onFullScreen={onFullScreen}
      >
        <Grid container direction="column">
          <Grid item>
            <Grid container spacing={1}>
              <Grid item>{icon}</Grid>
              <Grid item xs>
                <Typography variant="h6"> {title}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item xs>
              <Typography variant="caption" className={classes.subTitle}>
                {subTitle}
                {loading && <LinearProgress color="primary" />}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomDialog.defaultProps = {
  open: false,
};

CustomDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.object,
  icon: PropTypes.object,
};

export default CustomDialog;
