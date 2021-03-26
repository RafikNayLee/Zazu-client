import React from "react";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.secondary.dark,
    "&:hover": {
      color: theme.palette.secondary.light,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="caption" color="textSecondary">
        Coded by{" "}
        <a
          className={classes.link}
          href="https://github.com/RafikNayLee"
          target="_blank"
          rel="noreferrer"
        >
          Rafik Nay Lee
        </a>{" "}
      </Typography>
    </div>
  );
};

export default Footer;
