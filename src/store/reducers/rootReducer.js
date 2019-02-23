import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import currentUserReducer from "./currentUserReducer";
import holidaysReducer from "./holidaysReducer";
import leavesReducer from "./leavesReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  holidays: holidaysReducer,
  leaves: leavesReducer,
  currentUser: currentUserReducer,
  admin: adminReducer
});

export default rootReducer;
