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

//Import State
import Context from "./state/Context";

const App = () => {
  const { state, dispatch } = useContext(Context);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBarHeader />
        <ModalClass />
        <ModalStudent />
        <HomePage />
      </div>
      <SpeedDialMenu classSelected={state.tableStudentsInView} />
    </ThemeProvider>
  );
};

export default App;
