import React from "react";
import { connect } from "react-redux";
import NavBarLoggedIn from "./NavBarLoggedIn";
import NavBarLoggedOut from "./NavBarLoggedOut";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

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

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const user = this.props.user;
    const authenticated = this.props.authenticated;
    if (authenticated) {
      return <NavBarLoggedIn id={user.info.id} />;
    } else {
      return <NavBarLoggedOut />;
    }
  }
}

export function NavBarLogo() {
  return (
    <Link className="uk-navbar-item uk-logo" to="/">
      <img className={"logo"} src={logo} alt="Logo Fantacalcio React" />
    </Link>
  );
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  {}
)(NavBar);
