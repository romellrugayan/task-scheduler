import isEmpty from '../validation/isEmpty';

const initState = {
  isAuth: false,
  user: {}
};

export default function(state = initState, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
