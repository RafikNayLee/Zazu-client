/* eslint-disable no-use-before-define */
import React from "react";
import { useTheme, fade, makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

const R = require("ramda");

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 221,
    fontSize: 13,
  },
  button: {
    fontSize: 13,
    width: "100%",
    textAlign: "left",
    paddingBottom: 8,
    color: theme.palette.grey[700],
    // "#586069",
    fontWeight: 600,
    "&:hover,&:focus": {
      color: theme.palette.primary.main,
    },
    "& span": {
      width: "100%",
    },
    "& svg": {
      width: 16,
      height: 16,
      paddingRight: 2,
    },
  },
  tag: {
    marginTop: 3,
    height: 20,
    padding: ".15em 4px",
    fontWeight: 600,
    lineHeight: "15px",
    borderRadius: 2,
    whiteSpace: "nowrap",
  },
  popper: {
    border: "1px solid rgba(27,31,35,.15)",
    boxShadow: "0 3px 12px rgba(27,31,35,.15)",
    borderRadius: 3,
    width: 300,
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: "#586069",
    backgroundColor: "#f6f8fa",
  },
  header: {
    borderBottom: "1px solid #e1e4e8",
    padding: "8px 10px",
    fontWeight: 600,
  },
  inputBase: {
    padding: 10,
    width: "100%",
    borderBottom: "1px solid #dfe2e5",
    "& input": {
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      padding: 8,
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      border: "1px solid #ced4da",
      fontSize: 14,
      "&:focus": {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  paper: {
    boxShadow: "none",
    margin: 0,
    color: "#586069",
    fontSize: 13,
  },
  option: {
    minHeight: "auto",
    alignItems: "flex-start",
    padding: 8,
    '&[aria-selected="true"]': {
      backgroundColor: "transparent",
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover,
    },
    whiteSpace: "nowrap",
  },
  popperDisablePortal: {
    position: "relative",
  },
  iconSelected: {
    width: 17,
    height: 17,
    marginRight: 5,
    marginLeft: -2,
  },
  color: {
    width: 14,
    height: 14,
    flexShrink: 0,
    borderRadius: 3,
    marginRight: 8,
    marginTop: 2,
  },
  text: {
    flexGrow: 1,
  },
  close: {
    opacity: 0.6,
    width: 18,
    height: 18,
  },
}));

const AutocompleteDataPicker = React.forwardRef(
  (
    {
      dataList,
      icon,
      loading,
      value,
      multiple,
      onChange,
      name,
      label,
      selectAllLabel,
    },
    ref
  ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [pendingValue, setPendingValue] = React.useState([]);
    const theme = useTheme();

    const deleteAll = (event) => {
      onChange({
        target: {
          name,
          value: [],
        },
      });
    };
    const handleClick = (event) => {
      let pValue = value;
      if (multiple) {
        pValue = value.map((v) => dataList.find((f) => f.id === v));
      } else {
        pValue = dataList.find((f) => f.id === value) || value;
      }
      setPendingValue(pValue);
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (event, reason) => {
      if (reason === "toggleInput") {
        return;
      }

      onChange({
        target: {
          name,
          value: multiple
            ? pendingValue.map((v) => v.id)
            : R.propOr(pendingValue, "id", pendingValue),
        },
      });

      if (anchorEl) {
        anchorEl.focus();
      }
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "autocomplete-data-picker" : undefined;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid container spacing={1} direction="row">
            <Grid item>
              <ButtonBase
                disableRipple
                className={classes.button}
                aria-describedby={id}
                onClick={handleClick}
              >
                {icon}
                <span>
                  {multiple
                    ? value.length
                      ? label
                      : selectAllLabel
                    : `${label} : ${R.pathOr(
                        value,
                        ["name"],
                        dataList.find((el) => R.prop("id", el) === value)
                      )}`}
                </span>
                {loading && <LinearProgress color="primary" />}
              </ButtonBase>
            </Grid>
            {Boolean(value.length && multiple) && (
              <Grid item>
                <ButtonBase
                  disableRipple
                  className={classes.button}
                  aria-describedby={"Delete-all-button"}
                  onClick={deleteAll}
                >
                  <CloseIcon />
                </ButtonBase>
              </Grid>
            )}
          </Grid>

          {multiple &&
            value.map((value) => {
              const valueLabel = dataList.find((v) => v.id === value);
              return (
                <div
                  key={R.prop("id", valueLabel)}
                  className={classes.tag}
                  style={{
                    backgroundColor: R.propOr(
                      theme.palette.primary.light,
                      "color",
                      valueLabel
                    ),
                    color: theme.palette.getContrastText(
                      R.propOr(theme.palette.primary.light, "color", valueLabel)
                    ),
                  }}
                >
                  {R.prop("name", valueLabel)}
                </div>
              );
            })}
        </div>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          className={classes.popper}
        >
          {/* <div className={classes.header}>Apply labels to this pull request</div> */}
          <Autocomplete
            open
            onClose={handleClose}
            multiple={multiple}
            classes={{
              paper: classes.paper,
              option: classes.option,
              popperDisablePortal: classes.popperDisablePortal,
            }}
            value={pendingValue}
            onChange={(event, newValue) => {
              setPendingValue(newValue);
            }}
            disableCloseOnSelect
            disablePortal
            renderTags={() => null}
            noOptionsText={"Aucun élément trouvé"}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <DoneIcon
                  className={classes.iconSelected}
                  style={{ visibility: selected ? "visible" : "hidden" }}
                />
                <span
                  className={classes.color}
                  style={{
                    backgroundColor: option.color
                      ? option.color
                      : theme.palette.primary.light,
                  }}
                />
                <div className={classes.text}>
                  {option.name || option}
                  <br />
                  {option.description}
                </div>
                <CloseIcon
                  className={classes.close}
                  style={{ visibility: selected ? "visible" : "hidden" }}
                />
              </React.Fragment>
            )}
            options={[...dataList].sort((a, b) => {
              // Display the selected labels first.
              let ai = dataList.indexOf(dataList.find((v) => v.id === a));
              ai =
                ai === -1
                  ? dataList.length +
                    dataList.indexOf(dataList.find((v) => v.id === a))
                  : ai;
              let bi = dataList.indexOf(dataList.find((v) => v.id === b));
              bi =
                bi === -1
                  ? dataList.length +
                    dataList.indexOf(dataList.find((v) => v.id === b))
                  : bi;
              return ai - bi;
            })}
            getOptionLabel={(option) => option.name || option}
            renderInput={(params) => (
              <InputBase
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
                className={classes.inputBase}
              />
            )}
          />
        </Popper>
      </React.Fragment>
    );
  }
);

AutocompleteDataPicker.defaultProps = {
  value: [],
  multiple: true,
};

export default AutocompleteDataPicker;
