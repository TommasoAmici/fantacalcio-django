import React, { Component } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../actions";

import RequireAuth from "./auth/RequireAuth";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import SignUp from "./auth/SignUp";

import StringsLogin from "../localization/Strings";
import HomeLoggedIn from "./home/HomeLoggedIn";
import HomeLoggedOut from "./home/HomeLoggedOut";
import ChooseLeague from "./leagues/ChooseLeague";

function Leagues() {
  return <h1>Hola hola hola</h1>;
}

class NavBar extends Component {
  componentWillMount() {
    this.props.getUser();
  }

  render() {
    const { authenticated, username, league } = this.props;

    return (
      <div>
        <nav
          className="uk-navbar uk-navbar-container navbar-container"
          data-uk-navbar={true}
        >
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li>
                <NavLink
                  activeClassName={"uk-active"}
                  className={"inactive"}
                  to="/"
                >
                  {StringsLogin.home}
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName={"uk-active"}
                  className={"inactive"}
                  to="/leagues"
                >
                  {StringsLogin.leagues}
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              {authenticated ? (
                <li>
                  <a>{username}</a>
                  <div className="uk-navbar-dropdown">
                    <ul className="uk-nav uk-navbar-dropdown-nav">
                      <li>
                        <NavLink to="/logout">{StringsLogin.logout}</NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li>
                  <NavLink to="/login">{StringsLogin.login}</NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <div>
          <Route
            exact
            path="/"
            render={() =>
              authenticated ? <Redirect to="/dashboard" /> : <HomeLoggedOut />
            }
          />
          <Route
            path="/dashboard"
            render={() =>
              league.selected ? (
                <HomeLoggedIn />
              ) : (
                <Redirect to="/choose-league" />
              )
            }
          />
          <Route
            path="/choose-league"
            render={() =>
              league.selected ? <HomeLoggedIn /> : <ChooseLeague />
            }
          />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/leagues" component={Leagues} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.user.info.username,
    league: state.user.league
  };
}

export default connect(mapStateToProps, { getUser })(NavBar);
