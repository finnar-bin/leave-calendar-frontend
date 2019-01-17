import { getHolidays, getLeaves } from "../../api";

export const fetchHolidays = () => {
  return async dispatch => {
    const holidays = await getHolidays();
    if (holidays.error) {
      dispatch({
        type: "FETCH_HOLIDAYS_ERROR",
        error: true,
        holidays: []
      });
    } else {
      dispatch({
        type: "FETCH_HOLIDAYS_SUCCESS",
        error: false,
        holidays: holidays.data.items
      });
    }
  };
};
