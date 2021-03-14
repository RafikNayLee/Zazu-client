import React, { useEffect, useState } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

import axios from "axios";
import { useGeneralContext } from "../utils/GeneralContext";

const useStyles = makeStyles((theme) => ({
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

const Main = () => {
  const [feeds, setFeeds] = useState([]);
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
        .get(`${process.env.REACT_APP_BACKEND_API_URL}/feeds`, {
          headers: {
            "x-access-token": state.user.token,
          },
        })
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.LOADING,
            payload: false,
          });
          setFeeds(res.data);
          console.log("res.data: ", res.data);
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
    <div>
      {state.loading && (
        <LinearProgress className={classes.loading} color="primary" />
      )}
      {feeds.length > 0 ? (
        <GridList>
          {feeds.map((feed, i) => (
            <GridListTile key={`feed-${i}`}>
              <Card className={classes.card}>
                <CardHeader
                  title={feed.name}
                  subheader={
                    <Typography
                      variant="caption"
                      component="a"
                      href={feed.link}
                    >
                      {feed.link}
                    </Typography>
                  }
                />
                {/* <CardContent>
                <div
                  dangerouslySetInnerHTML={{ __html: feed.description }}
                ></div>
              </CardContent> */}
              </Card>
            </GridListTile>
          ))}
        </GridList>
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

      {errors.general && (
        <Typography color="error" variant="caption">
          {errors.general}
        </Typography>
      )}
    </div>
  );
};

export default Main;
