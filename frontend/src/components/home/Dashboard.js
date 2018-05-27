import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return <div className="uk-width-3-4@s">{this.props.children}</div>;
  }
}

export default Dashboard;
