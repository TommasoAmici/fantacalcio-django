import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Route from "react-router-dom/Route";
import NoLeagues from "./NoLeagues";
import RequireAuth from "../auth/RequireAuth";
import { StringsDashboard } from "../../localization/Strings";

function SidebarHeader(props) {
  return <li className="uk-nav-header">{props.title}</li>;
}

function SidebarLink(props) {
  return [
    <span className="uk-margin-small-right uk-icon">{props.icon}</span>,
    <span className="uk-text-middle">{props.title}</span>
  ];
}

class Dashboard extends Component {
  render() {
    const leagueId = 1;
    const leagues = this.props.leagues;
    console.log(leagues);

    return (
      <div className="uk-grid-small uk-flex-center" uk-grid={true}>
        <div className="uk-card uk-card-default uk-card-body uk-width-1-4@s">
          <ul
            className="uk-nav-default uk-nav-parent-icon"
            uk-nav="multiple: true"
          >
            <SidebarHeader title={StringsDashboard.menu} />
            <li className="uk-active">
              <Link to="/dashboard">
                <SidebarLink title={StringsDashboard.home} />
              </Link>
            </li>
            <li className="uk-parent">
              <Link to="/settings">
                <SidebarLink title={StringsDashboard.settings} />
              </Link>
              <ul className="uk-nav-sub">
                <li>
                  <Link to="/account">Sub item</Link>
                </li>
                <li>
                  <Link to="/account">Sub item</Link>
                </li>
              </ul>
            </li>
            <SidebarHeader title="Lega" />
            <li className="uk-parent">
              <Link to={"/leagues/" + leagueId + "/competitions"}>
                <SidebarLink title={StringsDashboard.competitions} />
              </Link>
              <ul className="uk-nav-sub">
                <li className="">
                  <a href="#">
                    <span
                      uk-icon="icon: plus"
                      className="uk-margin-small-right uk-icon"
                    />
                    <span className="uk-text-middle">
                      {StringsDashboard.new}
                    </span>
                  </a>
                  <a href="#">
                    <span
                      uk-icon="icon: calendar"
                      className="uk-margin-small-right uk-icon"
                    />
                    <span className="uk-text-middle">
                      {StringsDashboard.calendar}
                    </span>
                  </a>
                </li>
              </ul>
            </li>

            <li className="">
              <a href="#">
                <span
                  uk-icon="icon: users"
                  className="uk-margin-small-right uk-icon"
                />
                <span className="uk-text-middle">{StringsDashboard.teams}</span>
              </a>
            </li>
          </ul>
        </div>
        {leagues.length === 0 ? <NoLeagues /> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.info.username,
    leagues: state.user.info.leagues
  };
}

export default connect(mapStateToProps, {})(Dashboard);
