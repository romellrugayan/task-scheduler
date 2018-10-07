import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTasks } from '../../actions/taskActions';
import TaskForm from './TaskForm';
import TaskFeed from './TaskFeed';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      errors: {},
      loading: true
    };
  }

  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    const { tasks, loading } = this.props.task;
    let taskList;
    if (tasks === null || loading) {
      taskList = (
        <div className="teal-text">
          <h6>Loading...fetching from the server...</h6>
        </div>
      );
    } else {
      taskList = <TaskFeed tasks={tasks} />;
    }

    return (
      <div>
        <h5 className="indigo-text"> Tasks List : </h5>
        {taskList}
        <TaskForm />
      </div>
    );
  }
}

Tasks.propTypes = {
  getTasks: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    task: state.task
  };
};

export default connect(
  mapStateToProps,
  { getTasks }
)(Tasks);
