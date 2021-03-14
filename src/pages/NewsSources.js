import React, { useEffect, useState } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import LinearProgress from "@material-ui/core/LinearProgress";

import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import { useGeneralContext } from "../utils/GeneralContext";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },

  loading: {
    margin: theme.spacing(1),
  },
  card: {
    maxWidth: "500px",
    margin: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(1),
  },
}));

const NewsSources = () => {
  const [newsSources, setNewsSources] = useState([]);
  const { state, dispatch, ACTION_TYPES } = useGeneralContext();
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  useEffect(() => {
    if (state && state.user) {
      setErrors({});
      dispatch({
        type: ACTION_TYPES.LOADING,
        payload: true,
      });
      axios
        .get(`${process.env.REACT_APP_BACKEND_API_URL}/news`, {
          headers: {
            "x-access-token": state.user.token,
          },
        })
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.LOADING,
            payload: false,
          });
          setNewsSources(res.data);
        })
        .catch((err) => {
          dispatch({
            type: ACTION_TYPES.LOADING,
            payload: false,
          });
          setErrors(err.data);
        });
    }
  }, []);

  return (
    <div className={classes.root}>
      {state.loading && (
        <LinearProgress className={classes.loading} color="primary" />
      )}
      {newsSources.length > 0 ? (
        <GridList>
          {newsSources.map((newsSource, i) => (
            <GridListTile key={`newsSource-${i}`}>
              <Card className={classes.card}>
                <CardHeader
                  title={newsSource.name}
                  subheader={
                    <Typography
                      variant="caption"
                      component="a"
                      href={newsSource.site_url}
                    >
                      {newsSource.site_url}
                    </Typography>
                  }
                />
              </Card>
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
