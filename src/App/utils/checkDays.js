import moment from 'moment';
/**
 * Checks if selected date is before or after today
 * @param {Date | string} start start date to be checked
 * @returns {boolean} true if after today, false if before today
 */
export const isAfterToday = (date) => {
  const dateDifference = moment(date).diff(moment());
  if (dateDifference < 0) {
    return false;
  }
  return true;
}