import React from "react";
import "./style/App.css";
import { Provider, connect } from "react-redux";
import { Router } from "react-router-dom/Router";
import { Route } from "react-router-dom/Route";
import { Redirect } from "react-router-dom/Redirect";
import axios from "axios";
import { AUTH_USER, AUTH_ERROR, LEAGUE_SELECTED, USER } from "./actions/types";
import { errorHandler } from "./actions/index";

import LoadingSpinner from "./components/LoadingSpinner";
import NavBar from "./components/navbar/NavBar";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/home/Home";
import ChooseLeague from "./components/leagues/ChooseLeague";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import { Switch } from "react-router-dom/Switch";
import HomeLoggedOut from "./components/home/HomeLoggedOut";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    // token expires after 7 days, refresh on first load
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("/refresh-token/", { token })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          this.props.store.dispatch({ type: AUTH_USER });
        })
        .catch(error => {
          errorHandler(this.props.store.dispatch, error.response, AUTH_ERROR);
        });
      axios
        .get("/users/" + localStorage.getItem("pk") + "/", {
          headers: {
            Authorization: "JWT " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.props.store.dispatch({ type: USER, payload: response.data });
        })
        .catch(error => {
          errorHandler(this.props.store.dispatch, error.response, AUTH_ERROR);
        });
    }

    const leagueAccessCode = localStorage.getItem("league");
    if (leagueAccessCode) {
      axios
        .get("/leagues/" + leagueAccessCode + "/", {
          headers: {
            Authorization: "JWT " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.props.store.dispatch({
            type: LEAGUE_SELECTED,
            payload: {
              accessCode: leagueAccessCode,
              selected: true,
              data: response.data
            }
          });
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const authenticated = this.props.authenticated;
    const loading = this.state.loading;
    if (loading) {
      return <LoadingSpinner />;
    } else {
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
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(
  mapStateToProps,
  {}
)(App);
