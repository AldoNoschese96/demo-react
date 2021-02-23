import { useContext } from "react";

//Context
import Context from "./Context";

//Action
import * as A from "./ActionTypes/actionsType";

//Api
import {
  getAllClassrooms,
  deleteClass,
  newClassroom,
  editClasss,
} from "../api/classroomsApi";
import {
  getStudentsLength,
  getAllStudentByClass,
  newStudent,
  editStudent,
  deleteStudent,
} from "../api/studentsApi";

export default function useActions() {
  const { dispatch } = useContext(Context);

  const dispatchAllClassrooms = async () => {
    const result = await getAllClassrooms();

    return dispatch({ type: A.LOAD_CLASSROOMS, payload: result });
  };

  const dispatchStudentsLength = async () => {
    const { data } = await getStudentsLength();
    return dispatch({ type: A.LOAD_TOTAL_STUDENTS, payload: data });
  };

  const dispatchStudentsByClass = async (id) => {
    const result = await getAllStudentByClass(id);
    dispatch({ type: A.GET_CLASSROOM_SELECTED, payload: id });
    return dispatch({ type: A.LOAD_STUDENTS_CLASSROOM, payload: result });
  };

  const dispatchNewStudent = async (payload) => {
    const result = await newStudent(payload);
    dispatch({ type: A.NEW_STUDENT, payload: result });
    dispatchToggleAlert();
    return dispatch({ type: A.CLOSE_MODAL_STUDENTS });
  };

  const dispatchStudentEdit = async (id, payload) => {
    const { data } = await editStudent(id, payload);
    dispatchToggleAlert();
    return dispatch({ type: A.EDIT_STUDENT, payload: data });
  };

  const dispatchClassDelete = async (id) => {
    const result = await deleteClass(id);
    if (result === 204) {
      dispatchToggleAlert();
      return dispatch({ type: A.DELETE_CLASSROOM, payload: id });
    }
  };

  const dispatchStudentDelete = async (id) => {
    const result = await deleteStudent(id);
    if (result === 204) {
      dispatchToggleAlert();
      return dispatch({ type: A.DELETE_STUDENT, payload: id });
    }
  };

  const dispatchToggleAlert = () => {
    dispatch({ type: A.SHOW_ALERT_SUCCESS });
    return setTimeout(() => {
      return dispatch({ type: A.CLOSE_ALERT_SUCCESS });
    }, 2000);
  };

  const dispatchCloseModalClass = () => dispatch({ type: A.CLOSE_MODAL_CLASS });

  const dispatchNewClassroom = async (values) => {
    const result = await newClassroom(values);
    dispatchCloseModalClass();
    dispatchToggleAlert();
    return dispatch({ type: A.NEW_CLASSROOM, payload: result });
  };

  const dispatchEditClassroom = async (id, values) => {
    const { data } = await editClasss(id, values);
    dispatchCloseModalClass();
    dispatchToggleAlert();
    return dispatch({ type: A.EDIT_CLASSROOM, payload: data });
  };

  const dispatchOpenModalEditClass = (id) =>
    dispatch({ type: A.OPEN_MODAL_EDIT_CLASSROOM, payload: id });

  const dispatchOpenModalEditStudent = (id) =>
    dispatch({ type: A.OPEN_MODAL_EDIT_STUDENTS, payload: id });

  return {
    dispatchAllClassrooms,
    dispatchStudentsLength,
    dispatchStudentsByClass,
    dispatchNewStudent,
    dispatchStudentEdit,
    dispatchClassDelete,
    dispatchStudentDelete,
    dispatchOpenModalEditClass,
    dispatchOpenModalEditStudent,
    dispatchNewClassroom,
    dispatchEditClassroom,
  };
}
