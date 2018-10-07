import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = '/login';
  };

  render() {
    const { isAuth } = this.props.auth;

    const authLinks = (
      <ul className="right ">
        <li>
          <Link to="/" onClick={this.handleLogout} className="white-text">
            Logout
          </Link>
        </li>
      </ul>
    );

    const signUpLinks = (
      <ul className="right ">
        <li>
          <Link to="/register" className="white-text">
            Sign Up
          </Link>
        </li>
        <li>
          <Link to="/login" className="white-text">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div className="navbar-fixed">
        <nav className="grey darken-3 ">
          <div className="nav-wrapper container">
            <Link id="logo-container" to="/" className="brand-logo">
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                TASK
              </span>
              <span style={{ fontSize: '0.9rem' }}>Scheduler</span>
            </Link>
            {isAuth ? authLinks : signUpLinks}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
