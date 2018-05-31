import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import Dashboard from "./Dashboard";
import NewLeague from "../leagues/NewLeague";
import JoinLeague from "../leagues/JoinLeague";
import NoLeagues from "../leagues/NoLeagues";
import LeagueCreated from "../leagues/LeagueCreated";
import Overview from "./Overview";

class HomeLoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // if the user does not belong to any league render welcome page
    if (this.props.leagues && this.props.leagues.length === 0) {
      this.props.history.push(`${this.props.match.url}/welcome`);
    } else if (this.props.league.selected === false) {
      this.props.history.push("/choose-league");
    }
  }
  render() {
    return (
      <div className="uk-container dashboard">
        <div className="uk-grid uk-grid-medium">
          <DashboardSidebar />
          <Dashboard>
            <Route path={`${this.props.match.url}/`} component={Overview} />
            <Route
              path={`${this.props.match.url}/welcome`}
              component={NoLeagues}
            />
            <Route
              path={`${this.props.match.url}/new-league`}
              component={NewLeague}
            />
            <Route
              path={`${this.props.match.url}/join-league`}
              component={JoinLeague}
            />
            <Route
              path={`${this.props.match.url}/league-created`}
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
    leagues: state.user.info.leagues,
    league: state.user.league
  };
}

export default withRouter(connect(mapStateToProps, {})(HomeLoggedIn));
