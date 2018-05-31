import React from "react";
import "./App.css";
import { Provider, connect } from "react-redux";
import { Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/home/Home";
import ChooseLeague from "./components/leagues/ChooseLeague";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Switch from "react-router-dom/Switch";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const authenticated = this.props.authenticated;

    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          <div>
            <Route
              path="/"
              render={() => <NavBar authenticated={authenticated} />}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Home authenticated={authenticated} />}
              />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/choose-league" component={ChooseLeague} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, {})(App);
