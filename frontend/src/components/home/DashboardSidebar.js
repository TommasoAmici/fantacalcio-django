import React, { Component } from "react";
import { StringsDashboard } from "../../localization/Strings";
import { Link } from "react-router-dom";
import {
  SettingsIcon,
  HomeIcon,
  TrophyIcon,
  PlusIcon,
  CalendarIcon
} from "mdi-react";
import "./Dashboard.css";

function SidebarHeader(props) {
  return <li className="uk-nav-header">{props.title}</li>;
}

function SidebarLink(props) {
  return (
    <div>
      <span className="uk-margin-small-right uk-icon">{props.icon}</span>
      <span className="uk-text-middle sidebar-span">{props.title}</span>
    </div>
  );
}

export default class DashboardSidebar extends Component {
  render() {
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
          <SidebarHeader title="Lega" />
          <li>
            <Link to={"/dashboard/leagues/settings"}>
              <SidebarLink
                title={StringsDashboard.settings}
                icon={<SettingsIcon size={20} />}
              />
            </Link>
          </li>
          <li className="uk-parent">
            <a>
              <span className="uk-margin-small-right uk-icon">
                <TrophyIcon size={20} />
              </span>
              <span className="uk-text-middle sidebar-span">
                {StringsDashboard.competitions}
              </span>
            </a>
            <ul className="uk-nav-sub">
              <li className="">
                <Link to={"/dashboard/competitions/new"}>
                  <span className="uk-margin-small-right uk-icon">
                    <PlusIcon />
                  </span>
                  <span className="uk-text-middle">{StringsDashboard.new}</span>
                </Link>
                <Link to={"/dashboard/competitions/calendar"}>
                  <span className="uk-margin-small-right uk-icon">
                    <CalendarIcon />
                  </span>
                  <span className="uk-text-middle">
                    {StringsDashboard.calendar}
                  </span>
                </Link>
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
