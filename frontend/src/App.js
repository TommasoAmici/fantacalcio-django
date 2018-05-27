import React from "react";
import "./App.css";
import { Provider, connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";

class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          <Route path="/" component={NavBar} />
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
