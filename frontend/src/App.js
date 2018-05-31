import React from "react";
import "./App.css";
import { Provider, connect } from "react-redux";
import { Router, Route, Redirect } from "react-router-dom";
import NavBarLoggedIn from "./components/NavBarLoggedIn";
import NavBarLoggedOut from "./components/NavBarLoggedOut";
import PageNotFound from "./components/PageNotFound";
import HomeLoggedIn from "./components/home/HomeLoggedIn";
import HomeLoggedOut from "./components/home/HomeLoggedOut";
import ChooseLeague from "./components/leagues/ChooseLeague";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Switch from "react-router-dom/Switch";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { leagueSelected: "" };
  }
  componentDidMount() {
    const league = localStorage.getItem("league");
    if (league) {
      this.setState({
        leagueSelected: true
      });
    } else {
      this.setState({
        leagueSelected: false
      });
    }
  }
  render() {
    const authenticated = this.props.authenticated;
    const leagueSelected = this.state.leagueSelected;

    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          {authenticated ? (
            <div>
              <Route
                path="/"
                render={() => (
                  <NavBarLoggedIn id={localStorage.getItem("user")} />
                )}
              />
              <Route
                exact
                path="/"
                render={() => <Redirect to="/dashboard" />}
              />
              <Route
                path="/dashboard"
                render={() =>
                  leagueSelected ? (
                    <HomeLoggedIn />
                  ) : (
                    <Redirect to="/choose-league" />
                  )
                }
              />
              <Route
                path="/choose-league"
                render={() => <ChooseLeague history={this.props.history} />}
              />
            </div>
          ) : (
            <div>
              <Route path="/" component={NavBarLoggedOut} />
              <Switch>
                <Route exact path="/" component={HomeLoggedOut} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          )}
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
