import { getUsers } from "../../api";
import { FETCH_USERS } from "./actionTypes";

export const fetchUsers = () => {
  return async dispatch => {
    const users = await getUsers();
    let action = {
      type: FETCH_USERS,
      error: false,
      users: []
    };
    if (users.error) {
      action.error = true;
    } else {
      action.users = users.data.data;
    }
    dispatch(action);
  };
};
