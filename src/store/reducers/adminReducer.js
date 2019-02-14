import { SET_ADMIN, UNSET_ADMIN } from "../actions/actionTypes";

const initState = {
  success: false,
  error: false,
  message: ""
};

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ADMIN:
    case UNSET_ADMIN:
      return Object.assign({}, state, {
        success: action.success,
        error: action.error,
        message: action.message
      });

    default:
      return state;
  }
};

export default adminReducer;
