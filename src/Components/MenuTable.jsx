import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// Import Api
import { deleteStudent } from "../api/studentsApi";
import { deleteClass } from "../api/classroomsApi";

// Import State
import Context from "../state/Context";
import * as ACTIONS from "../state/ActionTypes/actionsType";

const ITEM_HEIGHT = 48;

const MenuTable = ({ classType, idRow }) => {
  const options = [
    `${classType === "Class" ? "Modifica Classe" : "Modifica Studente"}`,
    `${classType === "Class" ? "Elimina Classe" : "Elimina Studente"}`,
  ];
  const { dispatch } = useContext(Context);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const deleteClassHandler = async (id) => {
    const result = await deleteClass(id);
    if (result === 204) {
      return dispatch({ type: ACTIONS.DELETE_CLASSROOM, payload: id });
    }
  };

  const deleteStudentHandler = async (id) => {
    const result = await deleteStudent(id);
    if (result === 204) {
      return dispatch({ type: ACTIONS.DELETE_STUDENT, payload: id });
    }
  };

  const handleClose = (e, idRow, option) => {
    e.stopPropagation();
    setAnchorEl(null);
    switch (option) {
      case "Elimina Classe":
        return deleteClassHandler(idRow);
      case "Modifica Classe":
        return dispatch({
          type: ACTIONS.OPEN_MODAL_EDIT_CLASSROOM,
          payload: idRow,
        });
      case "Modifica Studente":
        return dispatch({
          type: ACTIONS.OPEN_MODAL_EDIT_STUDENTS,
          payload: idRow,
        });
      case "Elimina Studente":
        return deleteStudentHandler(idRow);
      default:
        return;
    }
  };

  return (
    <div>
      <IconButton
        size="small"
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={(e) => handleClose(e, idRow, option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default MenuTable;
