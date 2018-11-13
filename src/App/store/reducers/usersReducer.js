const initState = {
  users: [],
  error: false
};

const log = action => {
  return console.group(action.type), console.log(action), console.groupEnd();
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      log(action);
      return Object.assign({}, state, {
        users: action.users,
        error: action.error
      });

    case "FETCH_USERS_ERROR":
      log(action);
      return Object.assign({}, state, {
        users: action.users,
        error: action.error
      });

    default:
      return state;
  }
};

export default usersReducer;
