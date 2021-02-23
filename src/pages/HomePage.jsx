import React, { useContext, useEffect } from "react";

// Import Components
import ClassTable from "../Components/ClassTable";
import StudentsTable from "../Components/StudentsTable";
import InfoBox from "../Components/InfoBox";

//UI KIT
import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
// State
import Context from "../state/Context";

import useActions from "../state/useActions";

const useStyles = makeStyles((theme) => ({
  c: {
    padding: theme.spacing(3),
  },
  boxStyle: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  h: {
    background: "#0000",
  },
}));

const HomePage = () => {
  const classes = useStyles();

  const { dispatchAllClassrooms, dispatchStudentsLength } = useActions();

  useEffect(() => {
    dispatchAllClassrooms();
    dispatchStudentsLength();
  }, []);
  const { state } = useContext(Context);
  return (
    <>
      <Grid
        container
        spacing={3}
        className={classes.c}
        direction="row"
        alignItems="flex-start"
      >
        {state.viewTotals ? (
          <Grid item xs={12} sm={6}>
            <Zoom in={state.viewTotals}>
              <Box component="div">
                <InfoBox
                  title={"Totale Classi"}
                  data={state.classrooms.length}
                />
              </Box>
            </Zoom>
          </Grid>
        ) : null}
        {state.viewTotals ? (
          <Grid item xs={12} sm={6}>
            <Zoom
              in={state.viewTotals}
              style={{
                transitionDelay: state.viewTotals ? "300ms" : "0ms",
              }}
            >
              <Box component="div" elevation={2}>
                <InfoBox
                  title={"Totale Studenti"}
                  data={state.studentsLength}
                />
              </Box>
            </Zoom>
          </Grid>
        ) : null}
        <Grid item xs={12} sm={12} md={state.classroomSelected ? 6 : 12}>
          <ClassTable classes={state.classrooms} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {state.classroomSelected ? (
            <StudentsTable students={state.studentsByClassroom} />
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
