import moment from "moment";

/**
 * Compute number of leave credits to be deducted
 * @param {number} type 0 = Paid Leave , 1 = LWOP
 * @param {number} time 0 = Whole Day, 1 = HD AM, 2 = HD PM
 * @param {string} startDate start date
 * @param {string} endDate end date
 * @returns {number} leave credits to be deducted
 */
export const computeCredits = (type, time, startDate, endDate) => {
  // Compute the number of days
  // Adding 1 to make sure that result for same days aren't 0
  const days = moment(endDate).diff(moment(startDate), "days") + 1;

  // Type -> 0 = Paid, 1 = LWOP
  // Time -> 0 = Whole Day, 1&2 = Half Day
  if (type === 0) {
    if (time === 1 || time === 2) {
      // If number of days is more than 1 and selected is Half Day
      // only the last day will be counted as half day,
      // rest is considered whole day
      if (days > 1) {
        return 1 * (days - 1) + 0.5;
      } else {
        return 0.5 * days;
      }
    } else {
      return 1 * days;
    }
  } else {
    return 0;
  }
};

/**
 * Determines start and end times
 * @param {number} time 0 = Whole Day, 1 = HD AM, 2 = HD PM
 * @returns {Object} object containing string versions of the start and end times
 */
export const getTime = time => {
  switch (time) {
    case 0:
      return {
        start: "9:00 AM",
        end: "6:00 PM"
      };

    case 1:
      return {
        start: "9:00 AM",
        end: "1:00 PM"
      };

    case 2:
      return {
        start: "2:00 PM",
        end: "6:00 PM"
      };

    default:
      return {
        start: null,
        end: null
      };
  }
};

/**
 * Determines Leave Type
 * @param {number} type 0 = Paid Leave , 1 = LWOP
 * @returns {string} type of leave
 */
export const getType = type => {
  switch (type) {
    case 0:
      return "Vacation Leave";

    case 1:
      return "Leave Without Pay";

    default:
      break;
  }
};
