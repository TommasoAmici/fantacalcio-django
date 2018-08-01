import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom/withRouter";
import { selectLeague } from "../../actions/index";

class NavBarLeagueLi extends React.Component {
  constructor(props) {
    super(props);
    this.changeLeague = this.changeLeague.bind(this);
  }
  changeLeague() {
    localStorage.setItem("league", this.props.league.access_code);
    this.props.selectLeague(this.props.history);
  }

  render() {
    const league = this.props.league;
    return (
      <li key={league.access_code}>
        <a onClick={this.changeLeague}>{league.name}</a>
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    { selectLeague }
  )(NavBarLeagueLi)
);
