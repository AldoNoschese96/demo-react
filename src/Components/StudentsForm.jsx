import React, { useContext } from "react";

import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import { BeeButton } from "@webeetle/bee-theme";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//State
import Context from "../state/Context";
import * as ACTIONS from "../state/ActionTypes/actionsType";

//Api
import { newStudent, editStudent } from "../api/studentsApi";

const useStyles = makeStyles((theme) => ({
  padGrid: {
    padding: theme.spacing(2),
  },
  padButt: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));

const StudentsForm = (props) => {
  const uiClasses = useStyles();
  const { state, dispatch } = useContext(Context);
  const { initialValues } = props;

  // yes, this can even be async!
  async function onSubmit(values) {
    if (!initialValues) {
      const payload = {
        ...values,
        classroomId: state.classroomSelected,
      };
      console.log(payload);
      const result = await newStudent(payload);

      dispatch({ type: ACTIONS.NEW_STUDENT, payload: result });
      return dispatch({ type: ACTIONS.CLOSE_MODAL_STUDENTS });
    } else {
      const getStudentId = state.studentSelected._id;

      const { data } = await editStudent(getStudentId, values);

      return dispatch({ type: ACTIONS.EDIT_STUDENT, payload: data });
    }
  }

  // yes, this can even be async!
  async function validate(values) {
    const errors = {};

    if (!values.name) {
      errors.name = "Name Is Required";
    }
    if (!values.surname) {
      errors.surname = "Surname Is Required";
    }
    if (!values.birthDate) {
      errors.birthDate = "BirtDate Is Required";
    }
    return errors;
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container maxWidth alignItems="center" justify="space-between">
            <Grid className={uiClasses.padGrid} item xs={12} sm={6}>
              <label htmlFor="name">Name</label>
              <TextField type="text" id="name" name="name" required={true} />
            </Grid>
            <Grid item className={uiClasses.padGrid} xs={12} sm={6}>
              <label htmlFor="surname">Surname</label>
              <TextField
                id="surname"
                type="text"
                name="surname"
                required={true}
              />
            </Grid>
            <Grid item className={uiClasses.padGrid} xs={12} sm={6}>
              <label htmlFor="birthDate">Data Di Nascita</label>
              <TextField
                id="birthDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                name="birthDate"
                required={true}
              />
            </Grid>
            <Grid item className={uiClasses.padGrid} xs={12} sm={6}>
              <label htmlFor="number">Number</label>
              <TextField id="number" type="text" name="number" />
            </Grid>
            <Grid item className={uiClasses.padButt} xs={12}>
              <BeeButton
                fullWidth
                variant="contained"
                type="submit"
                color="secondary"
                disabled={
                  values &&
                  (!values.name || !values.surname || !values.birthDate)
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

export default StudentsForm;
