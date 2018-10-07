import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTask } from '../../actions/taskActions';

class TaskForm extends Component {
  state = {
    text: '',
    priority: '',
    duedate: '',
    errors: {}
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newTask = {
      text: this.state.text,
      priority: this.state.priority,
      duedate: this.state.duedate,
      status: 'Open'
    };

    this.props.createTask(newTask);
    this.setState({
      text: '',
      priority: '',
      duedate: ''
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="row">
        <div
          className="task grey lighten-3 z-depth-1"
          style={{ padding: '0px 10px 10px 10px', margin: '10px' }}
        >
          <h5 className="indigo-text">Create new task</h5>

          <form onSubmit={this.handleSubmit}>
            <div className="col s12 input-field">
              <input
                id="task"
                className="validate"
                type="text"
                name="text"
                value={this.state.text}
                onChange={this.handleChange}
              />
              <label htmlFor="task">New Task</label>
              {errors.text && (
                <div className="invalid-feedback">{errors.text}</div>
              )}
            </div>

            <div className="col s12 m6 input-field">
              <input
                id="priority"
                className="validate"
                type="text"
                name="priority"
                value={this.state.priority}
                onChange={this.handleChange}
              />
              <label htmlFor="priority">Priority (High, Medium or Low)</label>
              {errors.priority && (
                <div className="invalid-feedback">{errors.priority}</div>
              )}
            </div>
            <div className="col s12 m6 input-field">
              <input
                id="duedate"
                className="validate"
                type="text"
                name="duedate"
                value={this.state.duedate}
                onChange={this.handleChange}
              />
              <label htmlFor="duedate">Due Date (Year-Month-Day)</label>
              {errors.duedate && (
                <div className="invalid-feedback">{errors.duedate}</div>
              )}
            </div>

            <div className="right-align">
              <button className="btn waves-effect waves-light" type="submit">
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

TaskForm.propTypes = {
  createTask: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { createTask }
)(TaskForm);
