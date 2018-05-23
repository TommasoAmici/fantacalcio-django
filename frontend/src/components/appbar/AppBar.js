import React, { Component } from 'react'
import { Link, BrowserRouter, Route } from "react-router-dom";
import HomeSideBar from '../home/HomeSideBar';
import Leagues from '../leagues/Leagues';
import LoginForm from '../auth/Login';
import SignUpForm from '../auth/SignUp';
import Switch from 'react-router-dom/Switch';


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
    const isLoggedIn = this.state.isLoggedIn;
    const isHome = this.state.isHome;
    return (
      <BrowserRouter>
        <div>
          <nav className="uk-navbar-container navbar-container" data-uk-navbar>
            <div className="uk-navbar-left">
              <ul className="uk-navbar-nav">
                <li className={isHome ? 'uk-active' : 'inactive'}>
                  <Link to='/' onClick={this.handleClick}> Home</Link>
                </li>
                <li className={isHome ? 'inactive' : 'uk-active'}>
                  <Link to='/leagues' onClick={this.handleClick}>Leghe</Link>
                </li>
                <li>
                  <a className='inactive' href="#">Item</a>
                </li>
              </ul>
            </div>
            <div className="uk-navbar-right">
              <ul className="uk-navbar-nav">
                {isLoggedIn ? (<li className=""><a className='inactive' href="#">
                  <span data-uk-icon="icon: sign-out" className="uk-margin-small-right uk-icon"></span>
                  <span className="uk-text-middle">Logout</span>
                </a></li>) :
                  (
                    <li className=""><Link className='inactive' to='/login'>
                      <span data-uk-icon="icon: sign-in" className="uk-margin-small-right uk-icon"></span>
                      <span className="uk-text-middle">Login</span>
                    </Link></li>)}
              </ul>
            </div>
          </nav>

          <Switch>
            <Route exact path="/" component={HomeSideBar} />
            <Route path="/leagues" component={Leagues} />
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignUpForm} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
};

export default NavBar;