import { getUser } from "../../api";

export const setCurrentUser = id => {
  return async dispatch => {
    const user = await getUser(id);
    if (user.error) {
      dispatch({
        type: "SET_USER_ERROR",
        error: user.error,
        user: {
          firstName: null,
          lastName: null,
          credits: null
        }
      });
    } else {
      dispatch({
        type: "SET_USER_SUCCESS",
        error: false,
        user: {
          firstName: user.data.data.firstName,
          lastName: user.data.data.lastName,
          credits: parseFloat(user.data.data.leaveCredits).toPrecision(3)
        }
      });
    }
  };
};

export const unsetCurrentUser = () => {
  localStorage.removeItem("userId");
  return {
    type: "UNSET_USER",
    error: false,
    user: {
      firstName: "John",
      lastName: "Wick",
      credits: 100
    }
  };
};
