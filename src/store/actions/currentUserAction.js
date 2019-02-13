import { getUser, loginAdmin } from "../../api";
import { UNSET_USER, SET_USER, LOGIN_ADMIN_USER } from "./actionTypes";

export const setCurrentUser = id => {
  return async dispatch => {
    const user = await getUser(id);
    let action = {
      type: SET_USER,
      error: false,
      user: {}
    };
    if (user.error) {
      action.error = true;
      action.user = {
        firstName: null,
        lastName: null,
        credits: null
      };
    } else {
      action.user = {
        firstName: user.data.data.firstName,
        lastName: user.data.data.lastName,
        credits: parseFloat(user.data.data.leaveCredits).toPrecision(3)
      };
    }
    dispatch(action);
  };
};

export const unsetCurrentUser = () => {
  localStorage.removeItem("userId");
  return {
    type: UNSET_USER,
    error: false,
    user: {
      firstName: "John",
      lastName: "Wick",
      credits: 100
    }
  };
};

export const setAdminUser = (username, password) => {
  return async dispatch => {
    const login = await loginAdmin(username, password);
    let action = {
      type: LOGIN_ADMIN_USER,
      error: false,
      errorMessage: null
    };

    if (login.error) {
      action.error = true;
      action.errorMessage = "Error logging in.";
    } else {
      localStorage.setItem("token", login.data.token);
    }
    dispatch(action);
  };
};
