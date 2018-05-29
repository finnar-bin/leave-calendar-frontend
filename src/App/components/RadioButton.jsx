import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = ({id, name, text, checked, value, changeAction}) => (
  <div className="custom-control custom-radio custom-control-inline">
    <input
      type="radio"
      id={id}
      name={name}
      checked={checked}
      value={value}
      onChange={changeAction}
      className="custom-control-input"
    />
    <label className="custom-control-label" htmlFor={id}>{text}</label>
  </div>
)

RadioButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  changeAction: PropTypes.func
}

RadioButton.defaultProps = {
  checked: false
}

export default RadioButton;