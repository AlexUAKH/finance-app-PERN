import React, { createContext } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import UserStore from "./store/UserStore";
import ToastStore from "./store/ToastStore";

import App from "./App";

import "./i18n.js"
import "./index.scss";
import RecordsStore from "./store/RecordsStore";

const user = new UserStore();
const toast = new ToastStore();
const record = new RecordsStore();

export const Context = createContext({ user, toast, record });

ReactDOM.render(
  <Context.Provider
    value={{
      user,
      toast,
      record
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
