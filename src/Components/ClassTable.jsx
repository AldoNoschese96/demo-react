import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

//Ui Kit
import Box from "@material-ui/core/Box";
import { BeeGrid } from "@webeetle/bee-theme";

// Import State
import Context from "../state/Context";

// Import Components
import MenuTable from "../Components/MenuTable";
import Card from "../Components/Card";

//useActions
import useActions from "../state/useActions";

const ClassTable = ({ classes }) => {
  const { state } = useContext(Context);
  const { dispatchStudentsByClass } = useActions();
  const [classrooms, setClassrooms] = useState(
    classes.sort((x, y) => y.code - x.code)
  );
  const [sel, setSel] = useState([0]);
  const [sortingDirection, setSortingDirection] = useState("desc");

  const setSelectionHandler = async (e) => {
    const classroomsArr = [...state.classrooms];
    if (e.length === 0) {
      dispatchStudentsByClass(classroomsArr[0]._id);
      return setSel([0]);
    } else {
      const i = e.pop();
      dispatchStudentsByClass(classroomsArr[i]._id);
      return setSel([i]);
    }
  };

  const renderMenuHandler = (e) => {
    return <MenuTable classType={"Class"} idRow={e} />;
  };

  const searching = (e) => {
    if (e.length > 0) {
      return setClassrooms(
        classrooms.filter((x) =>
          x.department.toLowerCase().includes(e.toLowerCase())
        )
      );
    } else {
      return setClassrooms([...state.classrooms]);
    }
  };

  const sorting = (e) => {
    const classes = [...classrooms];

    if (sortingDirection === "desc") {
      console.log("desc");
      const sorted = classes.sort((x, y) => x.code - y.code);
      setClassrooms(sorted);
      return setSortingDirection("asc");
    } else {
      console.log("asc");
      const sorted = classes.sort((x, y) => y.code - x.code);
      console.log(sorted);
      setClassrooms(sorted);
      return setSortingDirection("desc");
    }
  };

  useEffect(() => setClassrooms(classes), [classes]);
  const columns = [
    {
      name: "ciao",
      title: " ",
    },
    {
      name: "code",
      title: "Code",
    },
    {
      name: "year",
      title: "Year",
    },
    {
      name: "department",
      title: "Department",
    },
    {
      name: "address",
      title: "Address",
    },
  ];
  return (
    <>
      <Box>
        <Card header={"Classi"}>
          <BeeGrid
            table={{
              columnExtensions: [
                {
                  columnName: "ciao",
                  width: 100,
                },
                {
                  columnName: "code",
                  width: 100,
                },
                {
                  columnName: "year",
                  width: 100,
                },
                {
                  columnName: "department",
                  width: 300,
                },
              ],
            }}
            paging={{
              defaultCurrentPage: 0,
              defaultPageSize: 10,
            }}
            selection={{
              onSelectionChange: (e) => setSelectionHandler(e),
              selection: sel,
              showSelectAll: false,
              selectByRowClick: true,
              highlightRow: true,
              showSelectionColumn: false,
            }}
            columns={columns}
            rows={classrooms && classrooms.map((c) => c)}
            providers={[
              {
                for: ["ciao"],
                formatterComponent: (e) => renderMenuHandler(e.row._id),
              },
            ]}
            loading={state.laodingClassrooms}
            search={{
              onValueChange: (e) => searching(e),
            }}
            sorting={{
              onSortingChange: (e) => sorting(e),
              showSortingControls: true,
            }}
          />
        </Card>
      </Box>
    </>
  );
};

ClassTable.propTypes = {
  classes: PropTypes.array,
};

export default ClassTable;
