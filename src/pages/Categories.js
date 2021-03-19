import React, { useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import { makeStyles } from "@material-ui/core/styles";

import { useGeneralContext } from "../utils/GeneralContext";
import { getCategories } from "../utils/api";
import Category from "../components/Category";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },

  text: {
    margin: theme.spacing(1),
  },
}));

const Categories = () => {
  const context = useGeneralContext();
  const { state } = context;
  const classes = useStyles();

  const errors = state.errors;

  useEffect(() => {
    getCategories(context);
  }, []);

  return (
    <div className={classes.root}>
      {state.categories.length > 0 ? (
        <GridList>
          {state.categories.map((categorie, i) => (
            <GridListTile key={`categorie-${i}`}>
              <Category categorie={categorie} />
            </GridListTile>
          ))}
        </GridList>
      ) : (
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.text}
        >
          You don't have any Categories yet.
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

export default Categories;
