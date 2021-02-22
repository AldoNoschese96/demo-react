import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import AddIcon from "@material-ui/icons/Add";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
//State
import Context from "../state/Context";
import * as ACTIONS from "../state/ActionTypes/actionsType";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 280,
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const SpeedDialMenu = ({ classSelected }) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(Context);
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleVisibility = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const openModalAddStudent = () => {
    return dispatch({ type: ACTIONS.OPEN_MODAL_STUDENTS });
  };

  const openModalAddClass = () => {
    return dispatch({ type: ACTIONS.OPEN_MODAL_CLASS });
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          key={1}
          icon={<AddIcon />}
          tooltipTitle={"Classe"}
          tooltipOpen
          onClick={openModalAddClass}
        />
        <SpeedDialAction
          key={3}
          icon={!state.viewTotals ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          tooltipTitle={"Totale"}
          tooltipOpen
          onClick={() => dispatch({ type: ACTIONS.TOGGLE_VIEW_TOTALS })}
        />
        {classSelected && classSelected ? (
          <SpeedDialAction
            key={2}
            icon={<AddIcon />}
            tooltipTitle={"Studente"}
            tooltipOpen
            onClick={openModalAddStudent}
          />
        ) : null}
      </SpeedDial>
    </div>
  );
};

export default SpeedDialMenu;
