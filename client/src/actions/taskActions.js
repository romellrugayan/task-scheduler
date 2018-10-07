import axios from 'axios';

// Create new task
export const createTask = taskData => dispatch => {
  axios
    .post('/api/tasks', taskData)
    .then(res =>
      dispatch({
        type: 'CREATE_TASK',
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err.response.data
      })
    );
};

// Get tasks list
export const getTasks = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/tasks')
    .then(res =>
      dispatch({
        type: 'GET_TASKS',
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: 'GET_TASKS',
        payload: null
      })
    );
};

// Delete Post
export const deleteTask = id => dispatch => {
  axios
    .delete(`/api/tasks/${id}`)
    .then(res =>
      dispatch({
        type: 'DELETE_TASK',
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: 'POST_LOADING'
  };
};
