import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { StringsLogin } from "../localization/Strings";

import { NavBarSection, NavBarLogo } from "./NavBar";

class NavBarLoggedOut extends React.Component {
  render() {
    return (
      <nav
        className="uk-navbar uk-navbar-container navbar-container"
        data-uk-navbar={true}
      >
        <NavBarSection side={"left"}>
          <NavBarLogo />
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
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(NavBarLoggedOut);
