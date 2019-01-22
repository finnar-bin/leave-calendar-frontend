import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import currentUserReducer from "./currentUserReducer";
import holidaysReducer from "./holidaysReducer";
import leavesReducer from "./leavesReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  holidays: holidaysReducer,
  leaves: leavesReducer,
  currentUser: currentUserReducer
});

export default rootReducer;
