import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import Dashboard from "./Dashboard";
import _ from "lodash";

class HomeLoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.league);
    // if the user does not belong to any league render welcome page
    if (this.props.leagues && this.props.leagues.length === 0) {
      this.props.history.push(`${this.props.match.url}/welcome`);
    } else if (
      this.props.league.selected === false ||
      _.isEmpty(this.props.league)
    ) {
      this.props.history.push(`/choose-league`);
    }
  }
  render() {
    return (
      <div className="uk-container dashboard">
        <div className="uk-grid uk-grid-medium">
          <DashboardSidebar />
          <Dashboard>{this.props.children}</Dashboard>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    leagues: state.user.info.leagues,
    league: state.user.league
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(HomeLoggedIn)
);
