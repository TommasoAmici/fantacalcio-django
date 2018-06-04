import React from "react";
import "./App.css";
import { Provider, connect } from "react-redux";
import { Router, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/home/Home";
import ChooseLeague from "./components/leagues/ChooseLeague";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Switch from "react-router-dom/Switch";
import HomeLoggedOut from "./components/home/HomeLoggedOut";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const authenticated = this.props.authenticated;
    const league = this.props.league;

    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          <div>
            <Route
              path="/"
              render={() => (
                <NavBar authenticated={authenticated} league={league} />
              )}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  authenticated ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <HomeLoggedOut />
                  )
                }
              />
              <Route path="/dashboard" component={Home} />
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
    authenticated: state.auth.authenticated,
    league: state.user.league
  };
}

export default connect(mapStateToProps, {})(App);
