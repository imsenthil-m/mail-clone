import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";
import "./styles.css";

const rootElement = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
