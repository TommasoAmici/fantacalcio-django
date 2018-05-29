import React, { Component } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../actions";

import axios from "axios";

import RequireAuth from "./auth/RequireAuth";
import Logout from "./auth/Logout";

import StringsLogin, { StringsDashboard } from "../localization/Strings";
import HomeLoggedIn from "./home/HomeLoggedIn";
import HomeLoggedOut from "./home/HomeLoggedOut";
import ChooseLeague from "./leagues/ChooseLeague";

import LoadingSpinner from "./spinner/LoadingSpinner";
import { NavBarDropDown, NavBarSection } from "./NavBar";

class NavBarLoggedIn extends React.Component {
  state = {
    externalData: null
  };

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        externalData: null,
        prevId: props.id
      };
    }

    // No state update necessary
    return null;
  }

  componentDidMount() {
    this._loadAsyncData(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.externalData === null) {
      this._loadAsyncData(this.props.id);
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    const authenticated = this.props.authenticated;

    if (this.state.externalData === null) {
      return <LoadingSpinner />;
    } else {
      const { league } = this.props;
      console.log(league);
      const { username, leagues } = this.state.externalData;
      const listLeagues = leagues.map(league => (
        <li key={league.name.toString()}>{league.name}</li>
      ));
      return (
        <div>
          <nav
            className="uk-navbar uk-navbar-container navbar-container"
            data-uk-navbar={true}
          >
            <NavBarSection side={"left"}>
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
                <NavBarDropDown title={StringsDashboard.leagues}>
                  {listLeagues}
                </NavBarDropDown>
              </li>
            </NavBarSection>
            <NavBarSection side={"right"}>
              <NavBarDropDown title={username}>
                <li>
                  <NavLink to="/logout">{StringsLogin.logout}</NavLink>{" "}
                </li>
              </NavBarDropDown>
            </NavBarSection>
          </nav>
          <div>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route
              path="/dashboard"
              render={() =>
                league ? <HomeLoggedIn /> : <Redirect to="/choose-league" />
              }
            />
            <Route path="/choose-league" component={ChooseLeague} />
            <Route path="/logout" component={Logout} />
          </div>
        </div>
      );
    }
  }

  _loadAsyncData(id) {
    this._asyncRequest = axios
      .get("/users/", {
        headers: { Authorization: "JWT " + localStorage.getItem("user") }
      })
      .then(externalData => {
        console.log(externalData.data);
        this._asyncRequest = null;
        this.setState({ externalData: externalData.data[0] });
      });
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.user.info.username,
    leagues: state.user.info.leagues,
    league: state.user.league
  };
}

export default connect(mapStateToProps, { getUser })(NavBarLoggedIn);
