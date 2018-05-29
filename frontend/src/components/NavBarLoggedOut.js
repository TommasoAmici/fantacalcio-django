import React, { Component } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../actions";

import axios from "axios";

import RequireAuth from "./auth/RequireAuth";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

import StringsLogin, { StringsDashboard } from "../localization/Strings";
import HomeLoggedIn from "./home/HomeLoggedIn";
import HomeLoggedOut from "./home/HomeLoggedOut";
import ChooseLeague from "./leagues/ChooseLeague";

import LoadingSpinner from "./spinner/LoadingSpinner";

import { NavBarSection } from "./NavBar";

class NavBarLoggedOut extends React.Component {
  render() {
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
          </NavBarSection>
          <NavBarSection side={"right"}>
            <li>
              <NavLink to="/login">{StringsLogin.login}</NavLink>
            </li>
          </NavBarSection>
        </nav>
        <div>
          <Route exact path="/" component={HomeLoggedOut} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(NavBarLoggedOut);
