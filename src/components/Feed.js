import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useGeneralContext } from "../utils/GeneralContext";

import icons from "./icons";
import { readFeed, setFeedCategories } from "../utils/api";
import useSpeak from "../utils/speech";
import CategoriesChooser from "./form/CategoriesChooser";

const R = require("ramda");

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: "350px",
    flexGrow: 1,
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const Feed = ({ feed }) => {
  const { speak } = useSpeak();
  const classes = useStyles();
  const theme = useTheme();
  const context = useGeneralContext();

  const read = (id) => () => {
    readFeed(context, id);
  };

  const onCategorieChange = (id) => (e) => {
    setFeedCategories(context, id, R.path(["target", "value"], e));
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        title={feed.name}
        subheader={
          <>
            <Chip
              style={{
                backgroundColor: feed.news.color,
                color: theme.palette.getContrastText(feed.news.color),
              }}
              label={feed.news.name}
              component="a"
              href={feed.link}
              clickable={true}
            />
          </>
        }
      />
      <CardContent className={classes.cardContent}>
        <div dangerouslySetInnerHTML={{ __html: feed.description }}></div>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={speak(
            `News Title: ${feed.news.name} .Feed Title: ${feed.name}. Feed Description: ${feed.description}`
          )}
        >
          <Tooltip title="Speak">
            {icons.voice({
              color: "secondary",
            })}
          </Tooltip>
        </IconButton>
        <IconButton onClick={read(feed.id)}>
          <Tooltip title={feed.read ? "Mark as Unread" : "Mark as read"}>
            {icons.read({
              color: feed.read ? "inherit" : "secondary",
            })}
          </Tooltip>
        </IconButton>
        <CategoriesChooser
          value={feed.categories.map(R.prop("id"))}
          onChange={onCategorieChange(feed.id)}
        />
      </CardActions>
    </Card>
  );
};

export default Feed;
