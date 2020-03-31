import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Collapsible, CollapsibleItem } from "react-materialize";
import Campaigns from "./Campaigns";

class Teams extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <Collapsible accordion className="container-fluid">
        {this.props.data.length > 0 ? (
          this.props.data.map((team, index) => {
            return (
              <CollapsibleItem
                expanded={false}
                header={"Click to see Campigns with Team - " + team[0][0].name}
                // icon={<Icon>filter_drama</Icon>}
                node="div"
                key={team[0][0].id}
              >
                <Campaigns
                  team_id={team[0][0].id}
                  user={user}
                  campaigns={team[0][0].campaigns}
                />
              </CollapsibleItem>
            );
          })
        ) : (
          <CollapsibleItem expanded={false} header="No Teams Found" node="div">
            No Data to Display
          </CollapsibleItem>
        )}
      </Collapsible>
    );
  }
}

Teams.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Teams);
