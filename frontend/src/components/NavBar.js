import React, { Component } from "react";

export function NavBarDropDown(props) {
  return (
    <ul className="uk-navbar-nav">
      <li>
        <a>{props.title}</a>
        <div className="uk-navbar-dropdown">
          <ul className="uk-nav uk-navbar-dropdown-nav">{props.children}</ul>
        </div>
      </li>
    </ul>
  );
}

export function NavBarSection(props) {
  return (
    <div className={"uk-navbar-" + props.side}>
      <ul className="uk-navbar-nav">{props.children}</ul>
    </div>
  );
}
