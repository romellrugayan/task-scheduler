import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTask } from '../../actions/taskActions';

const TaskFeed = props => {
  const tasks = props.tasks.map(task => (
    <div
      className="task indigo darken-3 z-depth-2"
      key={task._id}
      style={{ paddingTop: '10px', paddingBottom: '2px', margin: '5px' }}
    >
      <div className="row white-text">
        <div className="col m6">
          <button
            className="btn-small btn-flat red-text lighten-2"
            onClick={() => props.deleteTask(task._id)}
          >
            X
          </button>{' '}
          {task.text}
        </div>
        <div className="col m2 white-text">Priority: {task.priority}</div>
        <div className="col m2 white-text">Due date: {task.duedate}</div>
        <div className="col m2 white-text">Status: {task.status}</div>
      </div>
    </div>
  ));
  return <div>{tasks}</div>;
};

TaskFeed.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { deleteTask }
)(TaskFeed);
