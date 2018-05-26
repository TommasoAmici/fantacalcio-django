import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import "./App.css";
//import DataProvider from './DataProvider';

// import Redux components to set up and handle authentication on first load
import reducers from "./reducers/index";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { AUTH_USER } from "./actions/types";

// import views
import NavBar from "./components/appbar/AppBar";
import Dashboard from "./components/home/Dashboard";
import Home from "./components/home/Home";
import Leagues from "./components/leagues/Leagues";
import LoginForm from "./components/auth/Login";
import LogoutPage from "./components/auth/Logout";
import SignUpForm from "./components/auth/SignUp";
import PageNotFound from "./components/PageNotFound";
import RequireAuth from "./components/auth/RequireAuth";
import NewLeague from "./components/leagues/NewLeague";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// adds support for Redux browser extension
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const user = localStorage.getItem("user");

if (user) {
  store.dispatch({ type: AUTH_USER });
}

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={RequireAuth(Dashboard)} />
          <Route path="/leagues" component={RequireAuth(Leagues)}>
            <Route path="new" component={RequireAuth(NewLeague)} />
            <Route path="join" component={RequireAuth(NewLeague)} />
          </Route>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={LogoutPage} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  </Provider>
  //<DataProvider endpoint="leagues/"
  //              render={data => <ScrollableTabsButtonAuto data={data} />} />
);

export default App;
