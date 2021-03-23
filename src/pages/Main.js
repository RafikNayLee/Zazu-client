import React, { useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

import { useGeneralContext } from "../utils/GeneralContext";
import Feed from "../components/Feed";
import CategoriesChooser from "../components/form/CategoriesChooser";
import useFormWithStorage from "../utils/useFormWithStorage";
import ReadOnlyFeedsChooser from "../components/form/ReadOnlyFeedsChooser";
import { getFeeds, getCategories, getNewsSources } from "../utils/api";
import NewsSourcesChooser from "../components/form/NewsSourcesChooser";
import VoiceChooser from "../components/form/VoiceChooser";

const R = require("ramda");

const useStyles = makeStyles((theme) => ({
  text: {
    margin: theme.spacing(1),
  },
  paper: {
    position: "fixed",
    top: 65,
    padding: theme.spacing(1),
    width: "100%",
    zIndex: theme.zIndex.appBar,
  },
  content: {
    marginTop: 65,
  },
}));

const Main = () => {
  const context = useGeneralContext();
  const { state, dispatch, ACTION_TYPES } = context;
  const classes = useStyles();
  const { onChange, values } = useFormWithStorage(
    () => {},
    {
      categories: [],
      news: [],
      readOnly: "all",
      voice: 0,
    },
    `zazu-filter-user${state.user.id}`
  );

  const filterFeeds = (feeds) => {
    const predicates = [];
    const categories = values.categories;
    if (categories.length > 0) {
      predicates.push((f) => {
        const intersection = f.categories.filter((c) =>
          categories.includes(c.id)
        );
        return intersection.length > 0;
      });
    }
    const news = values.news;
    if (news.length > 0) {
      predicates.push((f) => news.includes(f.news.id));
    }

    const readOnly = values.readOnly;
    if (readOnly) {
      if (readOnly === "read") {
        predicates.push(R.propEq("read", true));
      } else if (readOnly === "unread") {
        predicates.push(R.propEq("read", false));
      }
    }
    return R.filter(R.allPass(predicates))(feeds);
  };

  useEffect(() => {
    getFeeds(context);
    getCategories(context);
    getNewsSources(context);
  }, []);

  useEffect(() => {
    if (values.voice) {
      dispatch({
        type: ACTION_TYPES.VOICE,
        payload: values.voice,
      });
    }
  }, [values.voice]);

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container direction="row" spacing={1}>
          <Grid item>
            <CategoriesChooser value={values.categories} onChange={onChange} />
          </Grid>
          <Grid item>
            <NewsSourcesChooser value={values.news} onChange={onChange} />
          </Grid>
          <Grid item>
            <ReadOnlyFeedsChooser value={values.readOnly} onChange={onChange} />
          </Grid>
          <Grid item>
            <VoiceChooser value={values.voice} onChange={onChange} />
          </Grid>
          <Grid item xs>
            {" "}
            <></>
          </Grid>
        </Grid>
      </Paper>
      {state.feeds.length > 0 ? (
        <Grid
          container
          spacing={1}
          justify="space-evenly"
          alignItems="stretch"
          className={classes.content}
        >
          {filterFeeds(state.feeds).map((feed, i) => (
            <Grid key={`feed-${i}`} item xs>
              <Feed feed={feed} />
            </Grid>
          ))}
        </Grid>
      ) : state.loading ? (
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.text}
        >
          Zazu is collecting his thoughts ...
        </Typography>
      ) : (
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.text}
        >
          You don't have any feeds yet. Consider adding more{" "}
          <Button variant="text" color="primary" component={Link} to="/news">
            {" "}
            News Sources
          </Button>
        </Typography>
      )}

      {state.errors.general && (
        <Typography color="error" variant="caption">
          {state.errors.general}
        </Typography>
      )}
    </div>
  );
};

export default Main;
