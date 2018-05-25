import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({prependText, size, type, otherClasses, changeAction, focus}) => {
  let inputSize, toFocus;
  switch (size) {
    case 'large':
    inputSize = 'input-group-lg';
      break;
    
    case 'small':
    inputSize = 'input-group-sm';
      break;

    default:
      inputSize = 'input-group'
      break;
  }

  if (focus) {
    toFocus = "autofocus";
  }

  return (
    <div className={`input-group ${inputSize} ${otherClasses}`}>
      <div className="input-group-prepend">
        <span className="input-group-text">{prependText}</span>
      </div>
      <input onChange={changeAction} type={type} className="form-control" autofocus={toFocus}/>
    </div>
  );
};

InputGroup.propTypes = {
  prependText: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small']),
  type: PropTypes.string,
  otherClasses: PropTypes.string,
  changeAction: PropTypes.func,
  value: PropTypes.string,
  focus: PropTypes.bool
}

InputGroup.defaultProps = {
  type: 'text',
  focus: false
}

export default InputGroup;