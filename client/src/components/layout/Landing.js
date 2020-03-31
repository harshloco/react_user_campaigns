import React, { Component } from "react";

class Landing extends Component {
  render() {
    // const { isAuthenticated } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>Login to access your dashboard</h4>
            <p className="flow-text grey-text text-darken-1">
              Dashboard consist information on teams and campaigns
            </p>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
