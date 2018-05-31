import React from "react";
import { connect } from "react-redux";

class Overview extends React.Component {
  render() {
    return <h1>HolaHolaHola</h1>;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(Overview);
