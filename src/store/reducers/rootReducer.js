import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import currentUserReducer from "./currentUserReducer";
import calendarReducer from "./calendarReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  events: calendarReducer,
  currentUser: currentUserReducer
});

export default rootReducer;
