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

export const fetchLeaves = () => {
  return async dispatch => {
    const leaves = await getLeaves();
    if (leaves.error) {
      dispatch({
        type: "FETCH_LEAVES_ERROR",
        error: true,
        leaves: []
      });
    } else {
      dispatch({
        type: "FETCH_LEAVES_SUCCESS",
        error: false,
        leaves: leaves.data.data
      });
    }
  };
};
