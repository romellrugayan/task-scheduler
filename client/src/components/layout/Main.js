import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/styles.css";

class Main extends Component {
  render() {
    return (
      <div className="main">
        <div className="dark-overlay main-inner">
          <div className="container">
            <div className="row">
              <div className="col s12">
                <div className="caption center-align">
                  <h1 className="white-text">Task Scheduler</h1>
                  <h5 className="white-text hide-on-small-only">
                    Work smart to be more productive...plan your work and work
                    the plan!
                  </h5>{" "}
                  <br />
                  <Link to="/register" className="btn darken-4">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
