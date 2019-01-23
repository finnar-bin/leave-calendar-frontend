import { FETCH_LEAVES, ADD_LEAVE } from "../actions/actionTypes";

const initState = {
  dates: [],
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

    default:
      return state;
  }
};

export default leavesReducer;
