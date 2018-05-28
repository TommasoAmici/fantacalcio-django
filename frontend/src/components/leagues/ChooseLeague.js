import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { StringsDashboard, StringsNewLeague } from "../../localization/Strings";
import axios from "axios";
import withRouter from "react-router-dom/withRouter";

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
  }
  render() {
    return (
      <Link
        key={this.props.accessCode}
        className={"no-underline"}
        onClick={this.toLeague}
        to={"/dashboard"}
      >
        <div class="uk-card uk-card-default uk-card-hover uk-card-body">
          <h3 className={"uk-card-title league-name"}>{this.props.name}</h3>
        </div>
      </Link>
    );
  }
}

class RenderList extends React.Component {
  render() {
    const leagues = this.props.leagues;
    const listItems = leagues.map(league => (
      <ListItem name={league.name} accessCode={league.access_code} />
    ));
    return (
      <div class="uk-align-center uk-grid-match uk-width-1-3@s" uk-grid={true}>
        {listItems}
      </div>
    );
  }
}

class ChooseLeague extends React.Component {
  constructor(props) {
    super(props);
    this.state = { leagues: [{}] };
  }

  componentWillMount() {
    if (this.props.league.selected) {
      this.props.history.push(`/dashboard`);
    } else {
      axios
        .get("/leagues/", {
          headers: { Authorization: "JWT " + localStorage.getItem("user") }
        })
        .then(response => {
          this.setState({ leagues: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  render() {
    const leagues = this.state.leagues;
    return (
      <div className="uk-container dashboard uk-text-center">
        <h1>{StringsDashboard.welcome}</h1>
        <RenderList leagues={leagues} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { league: state.user.league };
}

export default connect(mapStateToProps, {})(ChooseLeague);
