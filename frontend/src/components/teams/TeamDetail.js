import React from "react";
import { connect } from "react-redux";

class TeamDetail extends React.Component {
  render() {
    console.log(this.props.match.params.teamSlug);
    return <div />;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {}
)(TeamDetail);
