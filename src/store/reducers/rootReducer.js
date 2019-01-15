import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
// import selectUserReducer from "./selectUserReducer";

const rootReducer = combineReducers({
  users: usersReducer
  // selectedUser: selectUserReducer
});

export default rootReducer;
