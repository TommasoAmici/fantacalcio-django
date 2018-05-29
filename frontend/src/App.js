import React from "react";
import "./App.css";
import { Provider, connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import NavBarLoggedIn from "./components/NavBarLoggedIn";
import NavBarLoggedOut from "./components/NavBarLoggedOut";

class App extends React.Component {
  render() {
    const authenticated = this.props.authenticated;
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          {authenticated ? (
            <Route
              path="/"
              render={() => (
                <NavBarLoggedIn id={localStorage.getItem("user")} />
              )}
            />
          ) : (
            <Route path="/" component={NavBarLoggedOut} />
          )}
        </Router>
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, {})(App);
