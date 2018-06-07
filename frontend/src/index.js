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
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/index";
import thunk from "redux-thunk";

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(middleware, thunk))
);

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById("root")
);
registerServiceWorker();
