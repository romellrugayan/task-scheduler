import axios from 'axios';
import setAuthToken from '../validation/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err.response.data
      })
    );
};

// Login user ; Get user token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // save to local storage
      const { token } = res.data;
      // set token to local storage
      localStorage.setItem('jwtToken', token);
      // set toke to auth header (server-side)
      setAuthToken(token);
      // decode toke to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err.response.data
      })
    );
};

// Set logged-in user
export const setCurrentUser = decoded => {
  return {
    type: 'SET_CURRENT_USER',
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem('jwtToken');
  // remove auth header for future requesta
  setAuthToken(false);
  // set current user's isAuth to false
  dispatch(setCurrentUser({}));
};
