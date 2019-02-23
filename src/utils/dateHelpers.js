import moment from "moment";

/**
 * Checks if selected date is before or after today
 * @param {Date | string} start start date to be checked
 * @returns {boolean} true if after today, false if before today
 */
export const isAfterToday = date => {
  const dateDifference = moment(date).diff(moment());
  if (dateDifference < 0) {
    return false;
  }
  return true;
};

/**
 * Formats date
 * @param {Date | string} date date to be formatted
 * @param {string} format format type supported by momentjs
 * @returns {string} formatted date
 */
export const formatDate = (date, format) => {
  return moment(date).format(format);
};
