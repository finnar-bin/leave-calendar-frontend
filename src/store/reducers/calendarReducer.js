const initState = {
  events: [],
  error: false
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
        events: [...state.events, ...holidays],
        error: action.error
      });

    case "FETCH_USERS_ERROR":
      console.log(action);
      return state;

    default:
      return state;
  }
};

export default calendarReducer;
