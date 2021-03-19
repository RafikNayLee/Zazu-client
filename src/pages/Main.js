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
import useForm from "../utils/useForm";
import ReadOnlyFeedsChooser from "../components/form/ReadOnlyFeedsChooser";
import { getFeeds } from "../utils/api";

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
  //   const [feeds, setFeeds] = useState([]);
  const context = useGeneralContext();
  const { state } = context;
  const classes = useStyles();
  const { onChange, values } = useForm(() => {}, {
    categories: [],
    readOnly: "all",
  });

  const filterFeeds = (feeds) => {
    let filtered = [...feeds];
    const categories = values.categories;
    if (categories.length > 0) {
      filtered = filtered.filter((f) => {
        const intersection = f.categories.filter((c) =>
          categories.includes(c.id)
        );
        return intersection.length > 0;
      });
    }

    const readOnly = values.readOnly;
    if (readOnly) {
      if (readOnly === "read") {
        filtered = filtered.filter(R.propEq("read", true));
      } else if (readOnly === "read") {
        filtered = filtered.filter(R.propEq("read", false));
      }
    }
    return filtered;
  };

  useEffect(() => {
    getFeeds(context);
  }, []);

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container direction="row" spacing={1}>
          <Grid item>
            <CategoriesChooser value={values.categories} onChange={onChange} />
          </Grid>
          <Grid item>
            <ReadOnlyFeedsChooser value={values.readOnly} onChange={onChange} />
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
