import { LOGIN_ADMIN_USER } from "../actions/actionTypes";

const initState = {
  currentUser: {
    error: false,
    message: null
  },
  admin: {
    error: false,
    message: null
  }
};

const errorsReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN_USER:
      return Object.assign({}, state, {
        admin: {
          error: action.error,
          message: action.errorMessage
        }
      });

    default:
      return state;
  }
};

export default errorsReducer;
