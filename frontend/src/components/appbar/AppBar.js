import React, { Component } from 'react'
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isHome: true
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      isHome: !prevState.isHome
    }));
  }

  render() {
    const authenticated = this.props.authenticated;
    const isHome = this.state.isHome;
    return (
      <nav className="uk-navbar uk-navbar-container navbar-container" data-uk-navbar={true}>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li><NavLink activeClassName={'uk-active'} className={'inactive'} to={authenticated ? '/dashboard' : '/'}>Home</NavLink></li>
            <li><NavLink activeClassName={'uk-active'} className={'inactive'} to='/leagues'>Leagues</NavLink></li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li> {authenticated ? (<NavLink to='/logout'>Logout</NavLink>) : (<NavLink to='/login'>Login</NavLink>)}</li>
          </ul>
        </div>
      </nav>
    )
  }
};


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(NavBar);