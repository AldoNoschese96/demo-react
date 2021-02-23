import React, { useContext } from "react";
//Import UI KIT
import { BeeDialog } from "@webeetle/bee-theme";

//Import State
import Context from "../state/Context";
//Import Actions
import * as ACTIONS from "../state/ActionTypes/actionsType";

//Import Form
import StudentsForm from "../Components/StudentsForm";

const ModalStudent = () => {
  const { state, dispatch } = useContext(Context);

  const handleClose = () => dispatch({ type: ACTIONS.CLOSE_MODAL_STUDENTS });

  const renderFormHandler = () => {
    if (state.modalStudentEdit) {
      return <StudentsForm initialValues={state.studentSelected} />;
    } else {
      return <StudentsForm />;
    }
  };

  return (
    <>
      <BeeDialog
        color={"primary"}
        open={state.modalStudentsOpened}
        title={state.modalStudentEdit ? "Modifica Studente" : "Nuovo Studente"}
        onClose={handleClose}
      >
        {renderFormHandler()}
      </BeeDialog>
    </>
  );
};
export default ModalStudent;
