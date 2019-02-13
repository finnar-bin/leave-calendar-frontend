import { combineReducers } from "redux";

import usersReducer from "./usersReducer";
import currentUserReducer from "./currentUserReducer";
import holidaysReducer from "./holidaysReducer";
import leavesReducer from "./leavesReducer";
import errorsReducer from "./errorsReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  holidays: holidaysReducer,
  leaves: leavesReducer,
  currentUser: currentUserReducer,
  errors: errorsReducer
});

export default rootReducer;
