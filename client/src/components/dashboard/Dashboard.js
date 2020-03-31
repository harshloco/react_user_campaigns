import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Teams from "./Teams";
import { getTeams } from "../../actions/userTeams";
import { Col, ProgressBar } from "react-materialize";
import axios from "axios";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  state = {
    loadingTeams: true,
    teams: []
  };

  async componentDidMount() {
    let currentComponent = this;
    var params = {
      user_id: this.props.auth.user.id
    };

    const teamsResponse = await Promise.all([
      axios.post("/api/users/getTeams", params)
    ]);

    await axios
      .post("/api/users/getTeamCampaigns", teamsResponse[0].data.result)
      .then(function(response) {
        currentComponent.setState({
          teams: response.data.result[0],
          loadingTeams: false
        });
      });
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div className="container-fluid valign-wrapper">
        <div className="row section">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Welcome,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                List of Team and their campaigns
              </p>
            </h4>
          </div>
          {this.state.loadingTeams ? (
            <Col s={12}>
              <ProgressBar />
            </Col>
          ) : (
            <div className="landing-copy col s12 center-align ">
              <Teams data={this.state.teams} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getTeams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, getTeams })(Dashboard);
