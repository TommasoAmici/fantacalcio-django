// React dependencies
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// Redux dependencies
import { createStore, applyMiddleware } from "redux";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { AUTH_USER, AUTH_ERROR } from "./actions/types";
import { errorHandler } from "./actions/index";
import axios from "axios";

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(reducers, applyMiddleware(middleware, thunk));

// token expires after 7 days, refresh on first load
const token = localStorage.getItem("user");
if (token) {
  axios
    .post("/refresh-token/", { token })
    .then(response => {
      localStorage.setItem("user", response.data.token);
      store.dispatch({ type: AUTH_USER });
    })
    .catch(error => {
      errorHandler(store.dispatch, error.response, AUTH_ERROR);
    });
}

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById("root")
);
registerServiceWorker();
