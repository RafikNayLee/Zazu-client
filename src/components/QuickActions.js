import React, { useState } from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import { makeStyles } from "@material-ui/core/styles";

import icons from "./icons";
import AddElement from "./AddElement";

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(2),
  },
}));

const actions = {
  news: {
    icon: icons.news({ color: "primary" }),
    name: "News Sources",
    key: "news",
    initialValues: {
      name: "",
      site_url: "",
      rss_feed_url: "",
    },
    fieldLabels: {
      name: "Name",
      site_url: "Site URL",
      rss_feed_url: "RSS Feed URL",
    },
  },
  categories: {
    icon: icons.categories({ color: "primary" }),
    name: "Categories",
    key: "categories",
    initialValues: {
      name: "",
    },
    fieldLabels: {
      name: "Name",
    },
  },
};

const getComponent = (name) => (props) => {
  return (
    <AddElement
      initialValues={actions[name].initialValues}
      fieldLabels={actions[name].fieldLabels}
      title={actions[name].name || ""}
      subTitle={<></>}
      icon={actions[name].icon}
      {...props}
    />
  );
};

const QuickActions = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("news");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (key) => {
    setOpen(false);
    setSelectedAction(key);
    setDialogOpen(true);
  };

  const AddComponent = getComponent(selectedAction);
  return (
    <>
      <SpeedDial
        ariaLabel="zazu-quick-actions"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        size="small"
      >
        {Object.keys(actions).map((key) => {
          const action = actions[key];
          return (
            <SpeedDialAction
              key={action.key}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleClick(action.key)}
            />
          );
        })}
      </SpeedDial>
      <AddComponent
        elementKey={selectedAction}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
};

export default QuickActions;
