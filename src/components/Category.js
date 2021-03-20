import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import { makeStyles } from "@material-ui/core/styles";
import { deleteElementDataFn } from "../utils/api";
import { useGeneralContext } from "../utils/GeneralContext";

import icons from "./icons";
import AddElement from "./AddElement";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "500px",
    margin: theme.spacing(1),
  },
}));

const Category = ({ categorie }) => {
  const context = useGeneralContext();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openEditDialog = () => {
    setOpen(true);
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        title={categorie.name}
        avatar={icons.categories({
          style: {
            color: categorie.color,
          },
        })}
      />
      <CardActions>
        <IconButton
          onClick={deleteElementDataFn(context, "categories", categorie.id)}
        >
          <Tooltip title="Delete">{icons.delete({ color: "error" })}</Tooltip>
        </IconButton>
        <IconButton onClick={openEditDialog}>
          <Tooltip title="Edit">{icons.edit({ color: "primary" })}</Tooltip>
        </IconButton>
      </CardActions>
      <AddElement
        action="edit"
        elementKey={"categories"}
        id={categorie.id}
        dialogOpen={open}
        setDialogOpen={setOpen}
        initialValues={{
          name: categorie.name,
        }}
        fieldLabels={{
          name: "Name",
        }}
        title={"Categories"}
        subTitle={<></>}
        icon={icons.categories({ color: "primary" })}
      />
    </Card>
  );
};

export default Category;
