import React from 'react';
import PropTypes from 'prop-types';

const TimePicker = ({ changeAction, value, disabled }) => (
  <select className="form-control" onChange={changeAction} value={value} disabled={disabled}>
    <option>09:00 AM</option>
    <option>09:30 AM</option>
    <option>10:00 AM</option>
    <option>10:30 AM</option>
    <option>11:00 AM</option>
    <option>11:30 AM</option>
    <option>12:00 PM</option>
    <option>12:30 PM</option>
    <option>01:00 PM</option>
    <option>01:30 PM</option>
    <option>02:00 PM</option>
    <option>02:30 PM</option>
    <option>03:00 PM</option>
    <option>03:30 PM</option>
    <option>04:00 PM</option>
    <option>04:30 PM</option>
    <option>05:00 PM</option>
    <option>05:30 PM</option>
    <option>06:00 PM</option>
  </select>
)

TimePicker.propTypes = {
  changeAction: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool
}

TimePicker.defaultProps = {
  disabled: false
}

export default TimePicker;