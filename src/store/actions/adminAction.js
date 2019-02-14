import { loginAdmin } from "../../api";
import { SET_ADMIN, UNSET_ADMIN } from "../actions/actionTypes";

export const setAdmin = (username, password) => {
  return async dispatch => {
    const login = await loginAdmin(username, password);
    let action = {
      type: SET_ADMIN,
      error: false,
      success: false,
      message: ""
    };

    if (login.error) {
      action.error = true;
      action.message = "Error logging in.";
    } else {
      action.success = true;
      action.message = "Successfully logged in.";
      localStorage.setItem("token", login.data.token);
    }
    dispatch(action);
  };
};

export const unsetAdmin = () => {
  localStorage.removeItem("token");
  return {
    type: UNSET_ADMIN,
    error: false,
    success: false,
    message: ""
  };
};
