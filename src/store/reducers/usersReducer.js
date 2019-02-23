import { FETCH_USERS, ADD_USER, DELETE_USER } from "../actions/actionTypes";

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

    case DELETE_USER:
      if (action.status === "success") {
        return Object.assign({}, state, {
          users: state.users.filter(user => user._id !== action.id),
          status: action.status,
          message: action.message
        });
      } else if (action.status === "error") {
        return Object.assign({}, state, {
          users: state.users,
          status: action.status,
          message: action.message
        });
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default usersReducer;
