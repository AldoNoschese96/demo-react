import React, { useContext } from "react";

import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import { BeeButton } from "@webeetle/bee-theme";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
//State
import Context from "../state/Context";
import * as ACTIONS from "../state/ActionTypes/actionsType";

//Api
import { newClassroom, editClasss } from "../api/classroomsApi";

const useStyles = makeStyles((theme) => ({
  padGrid: {
    padding: theme.spacing(2),
  },
  padButt: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));

const ClassForm = (props) => {
  const uiClasses = useStyles();
  const { state, dispatch } = useContext(Context);
  const { initialValues } = props;

  async function onSubmit(values) {
    if (!initialValues) {
      const result = await newClassroom(values);

      dispatch({ type: ACTIONS.NEW_CLASSROOM, payload: result });
      dispatch({ type: ACTIONS.SHOW_ALERT_SUCCESS });
      setTimeout(() => {
        dispatch({ type: ACTIONS.CLOSE_ALERT_SUCCESS });
      }, 2000);
      return dispatch({ type: ACTIONS.CLOSE_MODAL_CLASS });
    } else {
      const getClassId = state.classroomEditSelected._id;

      const { data } = await editClasss(getClassId, values);
      dispatch({ type: ACTIONS.SHOW_ALERT_SUCCESS });
      setTimeout(() => {
        dispatch({ type: ACTIONS.CLOSE_ALERT_SUCCESS });
      }, 2000);
      return dispatch({ type: ACTIONS.EDIT_CLASSROOM, payload: data });
    }
  }

  async function validate(values) {
    if (!values.year) {
      return { year: "Year is Required" };
    }
    if (!values.department) {
      return { department: "department is Required" };
    }
    if (!values.address) {
      return { address: "Address is Required" };
    }
    return;
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container>
            <Grid item xs={12} className={uiClasses.padGrid}>
              <label htmlFor="year">Year</label>
              <TextField name="year" id="year" required={true} />
            </Grid>
            <Grid item xs={12} className={uiClasses.padGrid}>
              <label htmlFor="department">Department</label>
              <TextField name="department" id="department" required={true} />
            </Grid>
            <Grid item xs={12} className={uiClasses.padGrid}>
              <label htmlFor="address">Address</label>
              <TextField name="address" id="address" required={true} />
            </Grid>
            <Grid item xs={12} className={uiClasses.padButt}>
              <BeeButton
                fullWidth
                variant="contained"
                type="submit"
                color="secondary"
                disabled={
                  values &&
                  (!values.address || !values.department || !values.year)
                }
              >
                {!initialValues ? "Crea" : "Modifica"}
              </BeeButton>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default ClassForm;
