import React from "react";

class Dashboard extends React.Component {
  render() {
    return <div className="uk-width-3-4@s">{this.props.children}</div>;
  }
}

export default Dashboard;
