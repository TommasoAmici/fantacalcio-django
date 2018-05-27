import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import Dashboard from "./Dashboard";
import NewLeague from "../leagues/NewLeague";
import JoinLeague from "../leagues/JoinLeague";
import NoLeagues from "../leagues/NoLeagues";
import RequireAuth from "../auth/RequireAuth";
import LeagueCreated from "../leagues/LeagueCreated";

class HomeLoggedIn extends React.Component {
  componentWillMount() {
    // if the user does not belong to any league render welcome page
    if (this.props.leagues && this.props.leagues.length === 0) {
      this.props.history.push(`${this.props.match.url}/welcome`);
    }
  }
  render() {
    return (
      <div className="uk-container dashboard">
        <div className="uk-grid uk-grid-medium">
          <DashboardSidebar />
          <Dashboard>
            <Route
              path={`${this.props.match.url}/welcome`}
              component={NoLeagues}
            />
            <Route path={"/dashboard/new-league"} component={NewLeague} />
            <Route path={"/dashboard/join-league"} component={JoinLeague} />
            <Route
              path={"/dashboard/league-created"}
              component={LeagueCreated}
            />
          </Dashboard>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.info.username,
    leagues: state.user.info.leagues
  };
}

export default connect(mapStateToProps, {})(HomeLoggedIn);
