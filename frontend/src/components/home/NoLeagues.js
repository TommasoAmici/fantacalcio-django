import React from "react";
import { connect } from "react-redux";

class NoLeagues extends React.Component {
  render() {
    return (
      <div className="uk-card uk-card-default uk-card-body uk-width-3-4@s">
        <h1>Il maiale è nel porcile</h1>
        <h3>Uè, {this.props.username}</h3>

        <p uk-margin>
          <a className="uk-button uk-button-primary uk-button-large" href="">
            New league
          </a>
          <button className="uk-button uk-button-secondary uk-button-large">
            Join league
          </button>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { username: state.user.info.username };
}

export default connect(mapStateToProps)(NoLeagues);
