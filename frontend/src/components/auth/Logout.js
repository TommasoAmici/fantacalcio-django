import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/index";

class Logout extends React.Component {
  componentDidMount() {
    this.props.logoutUser(this.props.history);
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default connect(mapStateToProps, { logoutUser })(Logout);
