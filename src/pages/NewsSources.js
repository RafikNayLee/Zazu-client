import React, { useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import { makeStyles } from "@material-ui/core/styles";

import { useGeneralContext } from "../utils/GeneralContext";

import NewsSource from "../components/NewsSource";
import { getNewsSources } from "../utils/api";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },

  text: {
    margin: theme.spacing(1),
  },
}));

const NewsSources = () => {
  const context = useGeneralContext();

  const classes = useStyles();
  const { state } = context;
  const errors = state.errors;

  useEffect(() => {
    getNewsSources(context);
  }, []);

  return (
    <div className={classes.root}>
      {state.news.length > 0 ? (
        <GridList>
          {state.news.map((newsSource, i) => (
            <GridListTile key={`newsSource-${i}`}>
              <NewsSource newsSource={newsSource} />
            </GridListTile>
          ))}
        </GridList>
      ) : (
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.text}
        >
          You don't have any News Sources yet.
        </Typography>
      )}

      {errors.general && (
        <Typography color="error" variant="caption">
          {errors.general}
        </Typography>
      )}
    </div>
  );
};

export default NewsSources;
