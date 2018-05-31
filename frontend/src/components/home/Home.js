import React from "react";
import { connect } from "react-redux";
import HomeLoggedIn from "./HomeLoggedIn";
import HomeLoggedOut from "./HomeLoggedOut";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const authenticated = this.props.authenticated;
    if (authenticated) {
      return <HomeLoggedIn />;
    } else {
      return <HomeLoggedOut />;
    }
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, {})(Home);
