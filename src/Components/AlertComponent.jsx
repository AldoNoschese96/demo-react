import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    height: "64px",
    borderRadius: "0rem",
    "& > * + *": {
      marginTop: theme.spacing(2),
      borderRadius: "0rem",
    },
  },
}));

const AlertComponent = ({ show }) => {
  const classes = useStyles();

  return (
    <Slide direction="down" in={show} mountOnEnter unmountOnExit>
      <div className={classes.root}>
        <Alert
          style={{
            height: "64px",
            borderRadius: "0rem",
            display: "flex",
            alignItems: "center",
          }}
          variant="filled"
          severity="success"
        >
          Operation Successful !
        </Alert>
      </div>
    </Slide>
  );
};

export default AlertComponent;
