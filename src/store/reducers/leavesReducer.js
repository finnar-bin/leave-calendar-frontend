import {
  FETCH_LEAVES,
  ADD_LEAVE,
  FETCH_LEAVE_INFO,
  DELETE_LEAVE,
  FETCH_CURRENT_USER_LEAVES
} from "../actions/actionTypes";

const initState = {
  dates: [],
  currentUserLeaves: [],
  leaveInfo: {},
  error: false
};

const leavesReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_LEAVES:
      let dates = [];
      if (action.error) {
        return Object.assign({}, state, {
          dates,
          error: action.error
        });
      } else {
        action.leaves.map(leave => {
          const item = {
            id: leave._id,
            title: `${leave.userId.firstName} ${leave.userId.lastName}`,
            start: new Date(leave.start),
            end: new Date(leave.end),
            status: leave.status,
            type: leave.type
          };
          return dates.push(item);
        });
        return Object.assign({}, state, {
          dates,
          error: action.error
        });
      }

    case ADD_LEAVE:
      return Object.assign({}, state, {
        dates: [
          ...state.dates,
          {
            id: action.data._id,
            title: action.data.name,
            start: new Date(action.data.start),
            end: new Date(action.data.end),
            status: action.data.status,
            type: action.data.type
          }
        ]
      });

    case FETCH_LEAVE_INFO:
      return Object.assign({}, state, {
        leaveInfo: state.dates.find(date => date.id === action.id)
      });

    case DELETE_LEAVE:
      if (action.error) {
        return Object.assign({}, state, {
          error: true
        });
      } else {
        return Object.assign({}, state, {
          dates: state.dates.filter(date => date.id !== action.id),
          error: action.error
        });
      }

    case FETCH_CURRENT_USER_LEAVES:
      // const name = `${action.user.firstName} ${action.user.lastName}`;
      return Object.assign({}, state, {
        currentUserLeaves: state.dates.filter(
          date => date.title === action.name
        )
      });

    default:
      return state;
  }
};

export default leavesReducer;
