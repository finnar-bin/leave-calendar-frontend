import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
// import selectUserReducer from "./selectUserReducer";
import calendarReducer from "./calendarReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  events: calendarReducer
  // selectedUser: selectUserReducer
});

export default rootReducer;
