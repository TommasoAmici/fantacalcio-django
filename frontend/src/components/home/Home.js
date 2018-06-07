import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomeLoggedIn from "./HomeLoggedIn";
import HomeLoggedOut from "./HomeLoggedOut";
import NewLeague from "../leagues/NewLeague";
import JoinLeague from "../leagues/JoinLeague";
import NoLeagues from "../leagues/NoLeagues";
import LeagueCreated from "../leagues/LeagueCreated";
import Overview from "./Overview";
import SettingsLeague from "../leagues/SettingsLeague";
import NewCompetition from "../competitions/NewCompetition";
import Teams from "./Teams";
import TeamDetail from "./TeamDetail";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const authenticated = this.props.authenticated;
    if (authenticated) {
      return (
        <HomeLoggedIn>
          <Switch>
            <Route
              exact
              path={`${this.props.match.url}/`}
              component={Overview}
            />
            <Route
              path={`${this.props.match.url}/welcome`}
              component={NoLeagues}
            />
            <Route
              path={`${this.props.match.url}/leagues/new`}
              component={NewLeague}
            />
            <Route
              path={`${this.props.match.url}/leagues/join`}
              component={JoinLeague}
            />
            <Route
              path={`${this.props.match.url}/league-created`}
              component={LeagueCreated}
            />
            <Route
              path={`${this.props.match.url}/leagues/settings`}
              component={SettingsLeague}
            />
            <Route
              path={`${this.props.match.url}/leagues/teams`}
              component={Teams}
            />
            <Route
              path={`${this.props.match.url}/user/:userName/:teamSlug`}
              component={TeamDetail}
            />
            <Route
              path={`${this.props.match.url}/competitions/new`}
              component={NewCompetition}
            />
          </Switch>
        </HomeLoggedIn>
      );
    } else {
      return <HomeLoggedOut />;
    }
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(
  mapStateToProps,
  {}
)(Home);
