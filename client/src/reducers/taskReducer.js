const initState = {
  //task: {},
  tasks: [],
  loading: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case 'CREATE_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };
    case 'GET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    case 'POST_LOADING':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
