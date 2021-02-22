import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//State
import GlobaStateProvider from "./state/GlobalStateProvider";

ReactDOM.render(
  <React.StrictMode>
    <GlobaStateProvider>
      <App />
    </GlobaStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
