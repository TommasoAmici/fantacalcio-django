import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/index";

class Logout extends React.Component {
  componentWillMount() {
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
