import { FETCH_HOLIDAYS } from "../actions/actionTypes";

const initState = {
  dates: [],
  error: false
};

const holidaysReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_HOLIDAYS:
      let dates = [];
      if (action.error) {
        return Object.assign({}, state, {
          dates,
          error: action.error
        });
      } else {
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
          return dates.push(item);
        });
        return Object.assign({}, state, {
          dates,
          error: action.error
        });
      }

    default:
      return state;
  }
};

export default holidaysReducer;
