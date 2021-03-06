import React from "react";

class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    );
  }
}

export default LoadingSpinner;
