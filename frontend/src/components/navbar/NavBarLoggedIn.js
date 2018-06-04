import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, logoutUser } from "../../actions";
import axios from "axios";

import {
  StringsLogin,
  StringsActions,
  StringsNewLeague
} from "../../localization/Strings";

import LoadingSpinner from "../spinner/LoadingSpinner";
import { NavBarDropDown, NavBarSection, NavBarLogo } from "./NavBar";
import UIkit from "uikit";
import { PlusIcon } from "mdi-react";

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
        <li key={league.name.toString()}>{league.name}</li>
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
                <NavBarDropDown title={leagueSelected.name}>
                  {listLeagues}
                  <li class="uk-nav-divider" />
                  <li>
                    <Link to="/dashboard/new-league">
                      <PlusIcon size={20} />
                      {StringsNewLeague.newLeague}
                    </Link>
                  </li>
                </NavBarDropDown>
              ) : (
                <NavLink
                  activeClassName={"uk-active"}
                  className={"inactive"}
                  to="/choose-league"
                >
                  {StringsLogin.chooseLeague}
                </NavLink>
              )}
            </li>
          </NavBarSection>
          <NavBarSection side={"right"}>
            <NavBarDropDown title={username}>
              <li>
                <a onClick={this.handleLogout}>{StringsLogin.logout}</a>
              </li>
            </NavBarDropDown>
          </NavBarSection>
        </nav>
      );
    }
  }

  _loadAsyncData(id) {
    const headers = {
      headers: { Authorization: "JWT " + localStorage.getItem("user") }
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
  connect(mapStateToProps, { getUser, logoutUser })(NavBarLoggedIn)
);
