import React from "react";
import { connect } from "react-redux";
import { selectLeague } from "../../actions/league";
import { StringsDashboard } from "../../localization/Strings";
import avatar from "../../images/avatar_test.png";
import teamLogo from "../../images/logo.png";
import Link from "react-router-dom/Link";

class TeamList extends React.Component {
  render() {
    const team = this.props.team;
    const user = team.user;
    return (
      <div className={"uk-width-1-3@m"}>
        <div className="uk-card uk-card-default">
          <div className={"uk-card-header"}>
            <div>
              <div className={"uk-float-left"}>
                <img
                  className="uk-border-circle team-card-1"
                  width="60"
                  height="60"
                  alt={"Team logo"}
                  src={teamLogo}
                />
                <img
                  className="uk-border-circle team-card-2"
                  width="25"
                  height="25"
                  alt={"User avatar"}
                  src={avatar}
                />
              </div>

              <div>
                <Link to={`/dashboard/user/${user.username}/${team.slug}`}>
                  <h3 class="uk-card-title">{team.name}</h3>
                </Link>
                <p className="uk-text-meta uk-margin-remove-top">
                  {user.username}
                </p>
              </div>
            </div>
          </div>
          <div class="uk-card-body" />
        </div>
      </div>
    );
  }
}

class Teams extends React.Component {
  render() {
    const league = this.props.league;
    //const teams = league.data.teams;
    const teams = Array(20).fill(league.data.teams[0]);
    console.log(teams);
    const listTeams = teams.map(team => <TeamList team={team} />);
    return (
      <div>
        <h1>{StringsDashboard.teams}</h1>
        <div
          className="uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-flex-center uk-text-center"
          uk-grid="true"
        >
          {listTeams}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { league: state.user.league };
}

export default connect(
  mapStateToProps,
  { selectLeague }
)(Teams);
