import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../actions";
import axios from "axios";
// avatar test
import avatarDev from "../../images/avatar_test.png";
import "./NavBar.css";
import {
  StringsLogin,
  StringsActions,
  StringsNewLeague,
  StringsSettings
} from "../../localization/Strings";

import LoadingSpinner from "../spinner/LoadingSpinner";
import { NavBarDropDown, NavBarSection, NavBarLogo } from "./NavBar";
import NavBarLeagueLi from "./NavBarLeagueLi";
import UIkit from "uikit";
import { PlusIcon, LogoutVariantIcon, SettingsIcon } from "mdi-react";

class NavBarLoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      externalData: null
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
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

  handleLogout() {
    this.props.logoutUser(this.props.history);
    this.props.history.push("/");
    UIkit.modal.alert(StringsActions.logout);
  }

  render() {
    if (this.state.externalData === null) {
      return <LoadingSpinner />;
    } else {
      const { username, leagues } = this.state.externalData;
      const leagueSelected = this.props.leagueSelected;
      const listLeagues = leagues.map(league => (
        <NavBarLeagueLi league={league} />
      ));
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
                to="/dashboard"
              >
                {StringsLogin.home}
              </NavLink>
            </li>
            <li>
              {leagueSelected.selected ? (
                <NavBarDropDown title={leagueSelected.data.name}>
                  {listLeagues}
                  <li class="uk-nav-divider" />
                  <li>
                    <Link to="/dashboard/leagues/new">
                      <PlusIcon size={20} />
                      {StringsNewLeague.newLeague}
                    </Link>
                  </li>
                </NavBarDropDown>
              ) : (
                leagues &&
                leagues.length !== 0 && (
                  <NavLink
                    activeClassName={"uk-active"}
                    className={"inactive"}
                    to="/choose-league"
                  >
                    {StringsLogin.chooseLeague}
                  </NavLink>
                )
              )}
            </li>
          </NavBarSection>
          <NavBarSection side={"right"}>
            <NavBarDropDown title={username}>
              <li>
                <NavLink to="/dashboard/settings">
                  <span className={"uk-icon uk-margin-small-right"}>
                    <SettingsIcon size={20} />
                  </span>
                  {StringsSettings.settings}
                </NavLink>
              </li>
              <li>
                <a onClick={this.handleLogout}>
                  <span className={"uk-icon uk-margin-small-right"}>
                    <LogoutVariantIcon size={20} />
                  </span>
                  {StringsLogin.logout}
                </a>
              </li>
            </NavBarDropDown>
            <Link className="uk-navbar-item uk-logo" to="/dashboard/settings">
              <img
                className={"avatar uk-border-circle"}
                src={avatarDev}
                alt="User avatar"
              />
            </Link>
          </NavBarSection>
        </nav>
      );
    }
  }

  _loadAsyncData(id) {
    const headers = {
      headers: { Authorization: "JWT " + localStorage.getItem("token") }
    };
    this._asyncRequest = axios.get("/users/", headers).then(externalData => {
      this._asyncRequest = null;
      this.setState({ externalData: externalData.data[0] });
    });
  }
}

function mapStateToProps(state) {
  return { leagueSelected: state.user.league };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getUser, logoutUser }
  )(NavBarLoggedIn)
);
