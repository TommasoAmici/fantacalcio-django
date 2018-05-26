import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/index";
import UIkit from "uikit";

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
