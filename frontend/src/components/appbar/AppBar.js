import React, { Component } from 'react'
import { Link } from "react-router-dom";
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

  handleLogout() {
    this.props.logoutUser();
  }

  render() {
    const authenticated = this.props.authenticated;
    const isHome = this.state.isHome;
    return (
      <nav className="uk-navbar-container navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li className={isHome ? 'uk-active' : 'inactive'}>
              <Link to='/' onClick={this.handleClick}> Home</Link>
            </li>
            <li className={isHome ? 'inactive' : 'uk-active'}>
              <Link to='/leagues' onClick={this.handleClick}>Leghe</Link>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            {authenticated ? (<li className=""><Link className='inactive' onClick={this.handleLogout} to="/logout">
              <span data-uk-icon="icon: sign-out" className="uk-margin-small-right uk-icon"></span>
              <span className="uk-text-middle">Logout</span>
            </Link></li>) :
              (
                <li className=""><Link className='inactive' to='/login'>
                  <span data-uk-icon="icon: sign-in" className="uk-margin-small-right uk-icon"></span>
                  <span className="uk-text-middle">Login</span>
                </Link></li>)}
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