import { getUsers } from "../../api";

export const fetchUsers = () => {
  return async dispatch => {
    const users = await getUsers();
    if (users.error) {
      dispatch({
        type: "FETCH_USERS_ERROR",
        error: true,
        users: []
      });
    } else {
      dispatch({
        type: "FETCH_USERS_SUCCESS",
        error: false,
        users: users.data.data
      });
    }
  };
};
