import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "react-materialize";

class Campaigns extends Component {
  state = {
    campaigns: []
  };

  render() {
    return (
      <div className="">
        {this.props.campaigns.length > 0 ? (
          <Table className="striped  responsive-table">
            <thead>
              <tr>
                <th data-field="name">Name</th>
                <th data-field="start_date">Start Date</th>
                <th data-field="end_date">End Date</th>
                <th data-field="budget">Budget</th>
                <th data-field="hashtags">Hashtags</th>
                <th data-field="description">Description</th>
              </tr>
            </thead>
            <tbody>
              {this.props.campaigns.map((campaign, index) => {
                return (
                  <tr key={index}>
                    <td>{campaign.name}</td>
                    <td>{campaign.start_date}</td>
                    <td>{campaign.end_date}</td>

                    <td>{campaign.budget}</td>
                    <td>{campaign.hashtags}</td>
                    <td>{campaign.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p>No Campaign Found</p>
        )}
      </div>
    );
  }
}

Campaigns.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Campaigns);
