import React, { useContext } from "react";
//Components
import ClassForm from "../Components/ClassForm";

// UI Kit
import { BeeDialog } from "@webeetle/bee-theme";

//Import State
import Context from "../state/Context";

//Import Actions
import * as ACTIONS from "../state/ActionTypes/actionsType";

const ModalClass = () => {
  const { state, dispatch } = useContext(Context);

  const handleClose = () => dispatch({ type: ACTIONS.CLOSE_MODAL_CLASS });
  const renderFormHandler = () => {
    if (state.modalClassEdit) {
      return <ClassForm initialValues={state.classroomEditSelected} />;
    } else {
      return <ClassForm />;
    }
  };

  return (
    <>
      <BeeDialog
        color={"primary"}
        open={state.modalClassOpened}
        title={state.modalClassEdit ? "Modifica Classe" : "Nuova Classe"}
        onClose={handleClose}
      >
        {renderFormHandler()}
      </BeeDialog>
    </>
  );
};
export default ModalClass;
