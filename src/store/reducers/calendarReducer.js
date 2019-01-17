const initState = {
  holidays: {
    dates: [],
    error: false
  },
  leaves: {
    dates: [],
    error: false
  }
};

const calendarReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_HOLIDAYS_SUCCESS":
      console.log(action);
      let holidays = [];
      action.holidays.map(holiday => {
        // both set to holiday.start
        // to make sure that it will
        // only span 1 day in the calendar
        const start = new Date(holiday.start.date).toDateString();
        const end = new Date(holiday.start.date).toDateString();
        const item = {
          id: holiday.id,
          title: holiday.summary,
          start: new Date(`${start} 12:00 AM`),
          end: new Date(`${end} 12:00 AM`),
          status: "Holiday"
        };
        return holidays.push(item);
      });
      return Object.assign({}, state, {
        holidays: {
          dates: holidays,
          error: action.error
        }
      });

    case "FETCH_HOLIDAYS_ERROR":
      console.log(action);
      return Object.assign({}, state, {
        holidays: {
          dates: [],
          error: action.error
        }
      });

    case "FETCH_LEAVES_SUCCESS":
      console.log(action);
      let leaves = [];
      action.leaves.map(leave => {
        const item = {
          id: leave._id,
          title: `${leave.userId.firstName} ${leave.userId.lastName}`,
          start: new Date(leave.start),
          end: new Date(leave.end),
          status: leave.status,
          type: leave.type
        };
        return leaves.push(item);
      });
      return Object.assign({}, state, {
        leaves: {
          dates: leaves,
          error: action.error
        }
      });

    case "FETCH_LEAVES_ERROR":
      console.log(action);
      return Object.assign({}, state, {
        leaves: {
          dates: [],
          error: action.error
        }
      });

    default:
      return state;
  }
};

export default calendarReducer;
