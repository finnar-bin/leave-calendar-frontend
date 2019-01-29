import {
  SET_USER,
  UNSET_USER,
  ADD_LEAVE,
  DELETE_LEAVE
} from "../actions/actionTypes";

const initState = {
  user: {
    firstName: "John",
    lastName: "Wick",
    credits: 100
  },
  error: false
};

const currentUserReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        user: action.user,
        error: action.error
      });

    case UNSET_USER:
      return Object.assign({}, state, {
        user: action.user,
        error: action.error
      });

    case ADD_LEAVE:
    case DELETE_LEAVE:
      return Object.assign({}, state, {
        user: {
          firstName: state.user.firstName,
          lastName: state.user.lastName,
          credits: action.credits
        }
      });

    default:
      return state;
  }
};

export default currentUserReducer;
