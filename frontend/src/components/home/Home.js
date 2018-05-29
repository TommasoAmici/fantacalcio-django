import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../spinner/LoadingSpinner";

class Home extends React.Component {
  state = {
    externalData: null
  };

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId) {
      return {
        externalData: null,
        prevId: props.id
      };
    }

    // No state update necessary
    return null;
  }

  componentDidMount() {
    this._loadAsyncData(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.externalData === null) {
      this._loadAsyncData(this.props.id);
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      return <LoadingSpinner />;
    } else {
      const name = this.state.externalData.name;
      const teams = this.state.externalData.teams;
      const listTeams = teams.map(team => (
        <li key={team.name.toString()}>{team.name}</li>
      ));
      return (
        <div>
          <h1>{name}</h1>
          <ul>{listTeams}</ul>
        </div>
      );
    }
  }

  _loadAsyncData(id) {
    this._asyncRequest = axios
      .get("/leagues/" + id.accessCode + "/", {
        headers: { Authorization: "JWT " + localStorage.getItem("user") }
      })
      .then(externalData => {
        this._asyncRequest = null;
        this.setState({ externalData: externalData.data });
      });
  }
}

function mapStateToProps(state) {
  return {
    league: state.user.league
  };
}

export default withRouter(connect(mapStateToProps, {})(Home));
