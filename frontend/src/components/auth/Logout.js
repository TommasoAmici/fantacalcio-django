import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/index";

class LogoutPage extends React.Component {
  componentWillMount() {
    this.props.logoutUser();
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

export default connect(mapStateToProps, { logoutUser })(LogoutPage);
