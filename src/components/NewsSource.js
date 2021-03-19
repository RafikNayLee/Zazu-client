import React, { useState } from "react";
import { deleteElementDataFn } from "../utils/api";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import icons from "./icons";
import { useGeneralContext } from "../utils/GeneralContext";
import AddElement from "./AddElement";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "500px",
    margin: theme.spacing(1),
  },
}));

const NewsSource = ({ newsSource }) => {
  const context = useGeneralContext();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openEditDialog = () => {
    setOpen(true);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={icons.news({ color: "primary" })}
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
      <CardActions>
        <IconButton
          onClick={deleteElementDataFn(context, "news", newsSource.id)}
        >
          <Tooltip title="Delete">{icons.delete({ color: "error" })}</Tooltip>
        </IconButton>
        <IconButton onClick={openEditDialog}>
          <Tooltip title="Edit">{icons.edit({ color: "primary" })}</Tooltip>
        </IconButton>
      </CardActions>
      <AddElement
        action="edit"
        elementKey={"news"}
        id={newsSource.id}
        dialogOpen={open}
        setDialogOpen={setOpen}
        initialValues={{
          name: newsSource.name,
          site_url: newsSource.site_url,
          rss_feed_url: newsSource.rss_feed_url,
        }}
        fieldLabels={{
          name: "Name",
          site_url: "Site URL",
          rss_feed_url: "RSS Feed URL",
        }}
        title={"News Sources"}
        subTitle={<></>}
        icon={icons.news({ color: "primary" })}
      />
    </Card>
  );
};

export default NewsSource;
