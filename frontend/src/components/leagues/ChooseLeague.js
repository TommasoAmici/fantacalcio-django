import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { StringsDashboard } from "../../localization/Strings";
import axios from "axios";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { selectLeague } from "../../actions/index";

/*
 * Creates a menu to choose the league,
 * saves league-id to local storage to restore session
 */

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.toLeague = this.toLeague.bind(this);
  }
  toLeague() {
    localStorage.setItem("league", this.props.accessCode);
    this.props.handleSelectLeague();
  }
  render() {
    return (
      <a
        key={this.props.accessCode}
        className={"no-underline"}
        onClick={this.toLeague}
      >
        <div className="uk-card uk-card-default uk-card-hover uk-card-body">
          <h3 className={"uk-card-title league-name"}>{this.props.name}</h3>
        </div>
      </a>
    );
  }
}

class RenderList extends React.Component {
  render() {
    const leagues = this.props.leagues;
    const listItems = leagues.map(league => (
      <ListItem
        name={league.name}
        accessCode={league.access_code}
        handleSelectLeague={this.props.handleSelectLeague}
      />
    ));
    return (
      <div
        className="uk-align-center uk-grid-match uk-width-1-3@s"
        uk-grid={true}
      >
        {listItems}
      </div>
    );
  }
}

class ChooseLeague extends React.Component {
  constructor(props) {
    super(props);
    this.state = { externalData: null };
    this.handleSelectLeague = this.handleSelectLeague.bind(this);
  }

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
    if (!this.props.league.selected) {
      this._loadAsyncData(this.props.id);
    } else {
      this.props.history.push(`/`);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.externalData === null) {
      this._loadAsyncData(this.props.id);
    }
  }

  handleSelectLeague() {
    this.props.selectLeague(this.props.history);
  }

  render() {
    if (this.state.externalData === null) {
      return <LoadingSpinner />;
    } else {
      const leagues = this.state.externalData;
      return (
        <div className="uk-container dashboard uk-text-center">
          <h1>{StringsDashboard.welcome}</h1>
          <RenderList
            leagues={leagues}
            handleSelectLeague={this.handleSelectLeague}
          />
        </div>
      );
    }
  }

  _loadAsyncData(id) {
    this._asyncRequest = axios
      .get("/leagues/", {
        headers: { Authorization: "JWT " + localStorage.getItem("token") }
      })
      .then(externalData => {
        this._asyncRequest = null;
        this.setState({ externalData: externalData.data });
      });
  }
}

function mapStateToProps(state) {
  return { league: state.user.league };
}

export default withRouter(
  connect(
    mapStateToProps,
    { selectLeague }
  )(ChooseLeague)
);
