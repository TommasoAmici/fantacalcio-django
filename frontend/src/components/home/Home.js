import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";

class HomeLoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { leagueData: {} };
  }
  componentWillMount() {
    axios
      .get("/leagues/" + this.props.league.accessCode + "/", {
        headers: { Authorization: "JWT " + localStorage.getItem("user") }
      })
      .then(response => {
        console.log(response);
        this.setState({ leagueData: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const leagueData = this.state.leagueData;
    return (
      <div className="uk-container dashboard uk-text-capitalize">
        {leagueData.name}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    league: state.user.league
  };
}

export default withRouter(connect(mapStateToProps, {})(HomeLoggedIn));
