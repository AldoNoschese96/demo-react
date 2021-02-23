import React, { useContext } from "react";

//GlobalStyle
import "./style/app.scss";

//Theme
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
//Import Pages
import HomePage from "./pages/HomePage";

//Import Modal
import ModalClass from "./Components/ModalClass";
import ModalStudent from "./Components/ModalStudent";

//Import Component
import AppBarHeader from "./Components/AppBar";
import SpeedDialMenu from "./Components/SpeedDialMenu";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import DateFnsUtils from "@date-io/date-fns";
import { it } from "date-fns/locale";
//Import State
import Context from "./state/Context";

const App = () => {
  const { state, dispatch } = useContext(Context);

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider locale={it} utils={DateFnsUtils}>
        <div className="App">
          <AppBarHeader />
          <ModalClass />
          <ModalStudent />
          <HomePage />
        </div>
        <SpeedDialMenu classSelected={state.tableStudentsInView} />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
