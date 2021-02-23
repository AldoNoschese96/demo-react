import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//Ui Kit
import Box from "@material-ui/core/Box";
import { BeeGrid } from "@webeetle/bee-theme";
// Import Components
import MenuTable from "../Components/MenuTable";
import Card from "../Components/Card";

import moment from "moment";

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
    if (e.length > 0) {
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
        <Card header={"Studenti"}>
          <BeeGrid
            table={{
              columnExtensions: [
                {
                  columnName: "ciao",
                  width: 100,
                },
                {
                  columnName: "name",
                  width: 100,
                },
                {
                  columnName: "surname",
                  width: 100,
                },
                {
                  columnName: "number",
                  width: 300,
                },
                {
                  columnName: "birthdate",
                  width: 100,
                },
              ],
            }}
            columns={columns}
            rows={studentsState && studentsState.map((s) => s)}
            providers={[
              {
                for: ["cta"],
                formatterComponent: (e) => renderMenuHandler(e.row._id),
              },
              {
                for: ["birthDate"],
                formatterComponent: (e) => {
                  console.log(e);
                  return moment(e.row.birthDate).format("DD/MM/YYYY");
                },
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
        </Card>
      </Box>
    </>
  );
};

StudentTable.propTypes = {
  students: PropTypes.array,
};

export default StudentTable;
