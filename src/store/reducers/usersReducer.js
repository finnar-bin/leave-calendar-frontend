import { FETCH_USERS } from "../actions/actionTypes";

const initState = {
  users: [],
  error: false
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return Object.assign({}, state, {
        users: action.users,
        error: action.error
      });

    default:
      return state;
  }
};

export default usersReducer;
