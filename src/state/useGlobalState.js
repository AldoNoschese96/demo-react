import { useReducer } from "react";

// Actions
import * as ACTIONS from "../state/ActionTypes/actionsType";

const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case ACTIONS.LOAD_CLASSROOMS:
      return {
        ...state,
        classrooms: [...action.payload],
        laodingClassrooms: false,
      };
    case ACTIONS.LOAD_TOTAL_STUDENTS:
      return {
        ...state,
        studentsLength: action.payload,
      };
    case ACTIONS.NEW_CLASSROOM:
      return {
        ...state,
        classrooms: [...state.classrooms, { ...action.payload }],
      };
    case ACTIONS.LOAD_STUDENTS_CLASSROOM:
      return {
        ...state,
        studentsByClassroom: [...action.payload],
        tableStudentsInView: true,
      };
    case ACTIONS.GET_CLASSROOM_SELECTED:
      return {
        ...state,
        classroomSelected: action.payload,
      };
    case ACTIONS.DELETE_CLASSROOM:
      return {
        ...state,
        classrooms: [
          ...state.classrooms.filter((x) => x._id !== action.payload),
        ],
      };
    case ACTIONS.NEW_STUDENT:
      return {
        ...state,
        studentsByClassroom: [
          ...state.studentsByClassroom,
          { ...action.payload },
        ],
      };
    case ACTIONS.DELETE_STUDENT:
      return {
        ...state,
        studentsByClassroom: [
          ...state.studentsByClassroom.filter((x) => x._id !== action.payload),
        ],
      };
    case ACTIONS.OPEN_MODAL_CLASS:
      return {
        ...state,
        modalClassOpened: true,
      };
    case ACTIONS.CLOSE_MODAL_CLASS:
      return {
        ...state,
        modalClassOpened: false,
        modalStudentEdit: false,
        modalClassEdit: false,
      };

    case ACTIONS.OPEN_MODAL_STUDENTS:
      return {
        ...state,
        modalStudentsOpened: true,
      };
    case ACTIONS.OPEN_MODAL_EDIT_STUDENTS:
      return {
        ...state,
        modalStudentEdit: true,
        modalStudentsOpened: true,
        studentSelected: {
          ...state.studentsByClassroom.filter(
            (x) => x._id === action.payload
          )[0],
        },
      };
    case ACTIONS.EDIT_STUDENT:
      return {
        ...state,
        studentsByClassroom: [
          ...state.studentsByClassroom.map((x) =>
            x._id === action.payload._id ? (x = action.payload) : x
          ),
        ],
        modalStudentsOpened: false,
        modalStudentEdit: false,
      };
    case ACTIONS.CLOSE_MODAL_STUDENTS:
      return {
        ...state,
        modalStudentsOpened: false,
        modalStudentEdit: false,
        modalClassEdit: false,
      };

    case ACTIONS.OPEN_MODAL_EDIT_CLASSROOM:
      return {
        ...state,
        modalClassOpened: true,
        modalClassEdit: true,
        classroomEditSelected: {
          ...state.classrooms.filter((x) => x._id === action.payload)[0],
        },
      };
    case ACTIONS.EDIT_CLASSROOM:
      return {
        ...state,
        modalClassOpened: false,
        modalClassEdit: false,
        modalStudentEdit: false,
        classrooms: [
          ...state.classrooms.map((x) =>
            x._id === action.payload._id ? (x = action.payload) : x
          ),
        ],
      };
    case ACTIONS.TOGGLE_VIEW_TOTALS:
      return {
        ...state,
        viewTotals: !state.viewTotals,
      };
    default:
      return state;
  }
};

const useGlobaState = () => {
  const [state, dispatch] = useReducer(reducer, {
    classrooms: [],
    studentsByClassroom: [],
    tableStudentsInView: false,
    classroomSelected: null,
    classroomEditSelected: null,
    studentSelected: null,
    modalClassOpened: false,
    modalStudentsOpened: false,
    modalStudentEdit: false,
    modalClassEdit: false,
    laodingClassrooms: true,
    studentsLength: 0,
    viewTotals: false,
  });

  return { state, dispatch };
};

export default useGlobaState;
