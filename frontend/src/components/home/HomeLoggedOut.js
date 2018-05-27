import React, { Component } from "react";

class HomeLoggedOut extends Component {
  render() {
    return (
      <div>
        <div
          className="uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-flex-center uk-text-center"
          uk-grid="true"
        >
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              Feature 1
            </div>
          </div>
          <div className="uk-flex-last">
            <div className="uk-card uk-card-secondary uk-card-body">
              Feature 2
            </div>
          </div>
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              Feature 3
            </div>
          </div>
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              Feature 4
            </div>
          </div>
          <div className="uk-flex-first">
            <div className="uk-card uk-card-primary uk-card-body">
              Feature 5
            </div>
          </div>
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              Feature 6
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeLoggedOut;
