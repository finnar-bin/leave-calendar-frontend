import { FETCH_USERS, ADD_USER } from "../actions/actionTypes";

const initState = {
  users: [],
  status: "",
  message: ""
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return Object.assign({}, state, {
        users: action.users,
        status: action.status,
        message: action.message
      });

    case ADD_USER:
      return Object.assign({}, state, {
        users: [...state.users, action.user],
        status: action.status,
        message: action.message
      });

    default:
      return state;
  }
};

export default usersReducer;
