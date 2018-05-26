import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../actions";
import StringsLogin from "../../localization/Strings";

class NavBar extends Component {
  componentWillMount() {
    this.props.getUser();
  }

  render() {
    const authenticated = this.props.authenticated;
    const username = this.props.username;

    return (
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
                to={authenticated ? "/dashboard" : "/"}
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
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.user.info.username
  };
}

export default connect(mapStateToProps, { getUser })(NavBar);
