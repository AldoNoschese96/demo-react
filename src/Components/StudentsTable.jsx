import React, { useState, useEffect } from "react";

//Ui Kit
import Box from "@material-ui/core/Box";
import { BeeGrid } from "@webeetle/bee-theme";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
// Import Components
import MenuTable from "../Components/MenuTable";

const columns = [
  {
    name: "cta",
    title: " ",
  },
  {
    name: "name",
    title: "Nome",
  },
  {
    name: "surname",
    title: "Cognome",
  },
  {
    name: "birthDate",
    title: "Nascita",
  },
  {
    name: "number",
    title: "Numero",
  },
];

const StudentTable = ({ students }) => {
  const [studentsState, setStudentState] = useState();
  const [sortingState, setSortingState] = useState("desc");

  const renderMenuHandler = (e) => {
    return <MenuTable classType={"Students"} idRow={e} />;
  };

  const searching = (e) => {
    if (studentsState && e.length > 0) {
      return setStudentState(
        students.filter((x) => x.name.toLowerCase().includes(e.toLowerCase()))
      );
    } else {
      return setStudentState([...students]);
    }
  };

  const initializeStudentStateSorted = () => {
    const studentsArr = [...students];

    const sorted = studentsArr.sort((x, y) => {
      const dateX = new Date(x.birthDate).getTime();
      const dateY = new Date(y.birthDate).getTime();

      return dateY - dateX;
    });

    return setStudentState(sorted);
  };

  const sortingByBirthDate = () => {
    const studentsArr = [...students];

    if (sortingState === "desc") {
      const sorted = studentsArr.sort((x, y) => {
        const dateX = new Date(x.birthDate);
        const dateY = new Date(y.birthDate);

        return dateX - dateY;
      });
      setStudentState(sorted);
      return setSortingState("asc");
    } else {
      const sorted = studentsArr.sort((x, y) => y.code - x.code);
      setStudentState(sorted);
      return setSortingState("desc");
    }
  };

  useEffect(() => {
    initializeStudentStateSorted();
  }, [students]);
  return (
    <>
      <Box>
        <Slide direction="up" in={students} mountOnEnter unmountOnExit>
          <Paper>
            <BeeGrid
              columns={columns}
              rows={studentsState && studentsState.map((s) => s)}
              providers={[
                {
                  for: ["cta"],
                  formatterComponent: (e) => renderMenuHandler(e.row._id),
                },
              ]}
              loading={studentsState ? false : true}
              search={{
                onValueChange: (e) => searching(e),
              }}
              paging={{
                defaultCurrentPage: 0,
                defaultPageSize: 10,
              }}
              sorting={{
                onSortingChange: (e) => sortingByBirthDate(e),
                showSortingControls: true,
                sorting: [
                  {
                    columnName: "birthDate",
                    direction: sortingState,
                  },
                ],
              }}
            />
          </Paper>
        </Slide>
      </Box>
    </>
  );
};

export default StudentTable;