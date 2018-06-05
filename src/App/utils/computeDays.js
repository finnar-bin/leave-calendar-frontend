import moment from 'moment';
import _ from 'lodash';

/** Helper functions */
const roundToTwoDec = num => parseFloat(num).toPrecision(2);
const toSeconds = date => moment(date).unix();

/**
 * Compute leave credits to be deducted based on amount of hours of filed leave
 * @param {Date} start selected start date from calendar
 * @param {Date} end selected end date from calendar
 * @returns {number} leave credits to be deducted
 */
export const computeCredit = (start, end) => {
  // constant variables used for computation
  const perHour = 0.125;
  const secPerHour = 3600;
  const hoursPerDay = 8;
  
  // variables containing both selected date and time converted into seconds
  const sTime = toSeconds(start);
  const eTime = toSeconds(end);

  // variables containing only the selected date strings
  const sDateString = _.split(start, ' ', 1)[0];
  const eDateString = _.split(end, ' ', 1)[0];

  // date strings converted to moment objects
  const sDate = moment(sDateString);
  const eDate = moment(eDateString);


  // find total number of selected days on the calendar
  const numOfDays = eDate.diff(sDate, 'days') + 1;

  let numOfHours, toHour;
  if (numOfDays > 1) {
    // calculate total number of hours on the selected end date
    toHour = (eTime - toSeconds(`${eDateString} 9:00 AM`)) / secPerHour;
    
    // if end date has more than 3 hours of filed leaves, -1 hour due to unpaid lunchbreak
    let newEDateTime = toHour;
    if (toHour > 3) {
      newEDateTime = toHour - 1;
    }
    
    // return total number of hours filed
    numOfHours = ((numOfDays - 1) * hoursPerDay) + newEDateTime;
  } else {
    // calculate the total number of hours
    let diffTime = eTime - sTime;
    toHour = diffTime / secPerHour;
    
    // if number of hours is more than 3, -1 due to unpaid lunchbreak
    numOfHours = toHour;
    console.log('Less than 3 hours', numOfHours);
    if (toHour > 3) {
      numOfHours = toHour - 1;
      console.log('More than 3 hours', numOfHours);
    }
  }

  // calculate and return total number of credits to be deducted
  let credit = roundToTwoDec(roundToTwoDec(numOfHours) * perHour);
  return credit;
}