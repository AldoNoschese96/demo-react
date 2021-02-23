import React from "react";
import PropTypes from "prop-types";

//Ui Kit
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

//Import Action
import useActions from "../state/useActions";

const ITEM_HEIGHT = 48;

const MenuTable = ({ classType, idRow }) => {
  const options = [
    `${classType === "Class" ? "Modifica Classe" : "Modifica Studente"}`,
    `${classType === "Class" ? "Elimina Classe" : "Elimina Studente"}`,
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {
    dispatchClassDelete,
    dispatchStudentDelete,
    dispatchOpenModalEditClass,
    dispatchOpenModalEditStudent,
  } = useActions();
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e, idRow, option) => {
    e.stopPropagation();
    setAnchorEl(null);

    switch (option) {
      case "Elimina Classe":
        return dispatchClassDelete(idRow);
      case "Modifica Classe":
        return dispatchOpenModalEditClass(idRow);
      case "Modifica Studente":
        return dispatchOpenModalEditStudent(idRow);
      case "Elimina Studente":
        return dispatchStudentDelete(idRow);
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

MenuTable.propTypes = {
  classType: PropTypes.string,
  idRow: PropTypes.string,
};

export default MenuTable;
