import React from "react";
import { connect } from "react-redux";
import { StringsDashboard, StringsNewLeague } from "../../localization/Strings";

class NoLeagues extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleJoinClick = this.handleJoinClick.bind(this);
  }

  handleCreateClick() {
    this.props.history.push("/dashboard/new-league");
  }
  handleJoinClick() {
    this.props.history.push("/dashboard/join-league");
  }

  render() {
    const username = this.props.username;
    return (
      <div>
        <h1>{StringsDashboard.welcome}</h1>
        <h3>
          {StringsDashboard.formatString(
            StringsDashboard.welcomeBody,
            <b>{username}</b>
          )}
        </h3>
        <p>
          <button
            className="uk-button uk-button-primary uk-button-large"
            onClick={this.handleCreateClick}
          >
            {StringsNewLeague.newLeague}
          </button>
          <button
            className="uk-button uk-button-secondary uk-button-large"
            onClick={this.handleJoinClick}
          >
            {StringsNewLeague.joinLeague}
          </button>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.info.username
  };
}

export default connect(mapStateToProps, {})(NoLeagues);
