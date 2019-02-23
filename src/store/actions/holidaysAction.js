import { getHolidays } from "../../api";
import { FETCH_HOLIDAYS } from "./actionTypes";

export const fetchHolidays = () => {
  return async dispatch => {
    const holidays = await getHolidays();
    let action = {
      type: FETCH_HOLIDAYS,
      error: false,
      holidays: []
    };
    if (holidays.error) {
      action.error = true;
    } else {
      action.holidays = holidays.data.items;
    }
    dispatch(action);
  };
};
