import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <div className="col s8 m8 brand-logo center black-text">
              React.js Demo
            </div>
            <div className="col s4 m12">
              <ul className="right ">
                {isAuthenticated ? (
                  <li>
                    <button
                      style={{
                        width: "120px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                        paddingLeft: "1rem",
                        marginRight: "1rem"
                      }}
                      onClick={this.onLogoutClick}
                      className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      style={{
                        width: "120px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginRight: "1rem"
                      }}
                      className="btn btn-large btn-flat waves-effect white black-text"
                    >
                      Log In
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
