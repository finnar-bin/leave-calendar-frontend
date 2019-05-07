import { getUsers, newUser, removeUser, updateUser } from "../../api";
import { FETCH_USERS, ADD_USER, DELETE_USER, EDIT_USER } from "./actionTypes";

export const fetchUsers = () => {
  return async dispatch => {
    const users = await getUsers();
    let action = {
      type: FETCH_USERS,
      status: "",
      message: "",
      users: []
    };
    if (users.error) {
      action.status = "error";
      action.message = "Error fetching users";
    } else {
      action.status = "success";
      action.message = "Users fetched successfully";
      action.users = users.data.data;
    }
    dispatch(action);
  };
};

export const addUser = (firstName, lastName, team, brand, credits) => {
  return async dispatch => {
    const user = await newUser(firstName, lastName, team, brand, credits);
    let action = {
      type: ADD_USER,
      status: "",
      message: "",
      user: {}
    };
    if (user.error) {
      action.status = "error";
      action.message = user.error.data.message;
    } else {
      action.status = "success";
      action.user = user.data.data;
      action.message = "User added successfully";
    }
    dispatch(action);
  };
};

export const deleteUser = id => {
  return async dispatch => {
    const toRemove = await removeUser(id);
    let action = {
      type: DELETE_USER,
      status: "",
      message: "",
      id: null
    };
    if (toRemove.error) {
      action.status = "error";
      action.message = toRemove.error.data.message;
    } else {
      action.status = "success";
      action.message = "Removed user successfully";
      action.id = id;
    }
    dispatch(action);
  };
};

export const editUser = (id, firstName, lastName, team, brand, credits) => {
  return async dispatch => {
    const user = await updateUser(
      id,
      firstName,
      lastName,
      team,
      brand,
      credits
    );
    let action = {
      type: EDIT_USER,
      status: "",
      message: "",
      user: {}
    };
    if (user.error) {
      action.status = "error";
      action.message = user.error.data.message;
    } else {
      action.status = "success";
      action.message = "User has been updated";
      action.user = user.data.data;
    }
    dispatch(action);
  };
};
