import React, { Component } from "react";
import { StringsDashboard } from "../../localization/Strings";
import { Link } from "react-router-dom";
import { SettingsIcon, HomeIcon, TrophyIcon } from "mdi-react";
import "./Dashboard.css";

function SidebarHeader(props) {
  return <li className="uk-nav-header">{props.title}</li>;
}

function SidebarLink(props) {
  return (
    <div className={""}>
      <span className="uk-margin-small-right uk-icon">{props.icon}</span>
      <span className="uk-text-middle sidebar-span">{props.title}</span>
    </div>
  );
}

export default class DashboardSidebar extends Component {
  render() {
    const leagueId = 1;
    return (
      <div className="uk-card uk-card-default uk-card-body uk-width-1-4@s">
        <ul
          className="uk-nav-default uk-nav-parent-icon"
          uk-nav="multiple: true"
        >
          <SidebarHeader title={StringsDashboard.menu} />
          <li className="uk-active">
            <Link to="/">
              <SidebarLink
                title={StringsDashboard.home}
                icon={<HomeIcon size={20} />}
              />
            </Link>
          </li>
          <li className="uk-parent">
            <Link to="/settings">
              <SidebarLink
                title={StringsDashboard.settings}
                icon={<SettingsIcon size={20} />}
              />
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
          <li>
            <Link to={"/dashboard/league/settings"}>
              <SidebarLink
                title={StringsDashboard.settings}
                icon={<SettingsIcon size={20} />}
              />
            </Link>
          </li>
          <li className="uk-parent">
            <Link to={"/leagues/" + leagueId + "/competitions"}>
              <SidebarLink
                title={StringsDashboard.competitions}
                icon={<TrophyIcon size={20} />}
              />
            </Link>
            <ul className="uk-nav-sub">
              <li className="">
                <a>
                  <span
                    uk-icon="icon: plus"
                    className="uk-margin-small-right uk-icon"
                  />
                  <span className="uk-text-middle">{StringsDashboard.new}</span>
                </a>
                <a>
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
            <a>
              <span
                uk-icon="icon: users"
                className="uk-margin-small-right uk-icon"
              />
              <span className="uk-text-middle">{StringsDashboard.teams}</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
