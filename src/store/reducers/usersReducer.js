const initState = {
  users: [],
  error: false
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      console.log(action);
      return Object.assign({}, state, {
        users: action.users,
        error: action.error
      });

    case "FETCH_USERS_ERROR":
      console.error(action);
      return Object.assign({}, state, {
        users: action.users,
        error: action.error
      });

    default:
      return state;
  }
};

export default usersReducer;
