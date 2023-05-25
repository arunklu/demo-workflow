import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";
import { createStore,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import "antd/dist/antd.css";
// const store = createStore(rootReducer);

function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
try {
  const serialisedState = localStorage.getItem("persistantState");
  if (serialisedState === null) return undefined;
  return JSON.parse(serialisedState);
} catch (e) {
  console.warn(e);
  return undefined;
}
}

const store = createStore(
  rootReducer,loadFromLocalStorage()
  //,  composeWithDevTools()
  // other store enhancers if any
);

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();
