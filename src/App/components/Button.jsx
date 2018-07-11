import React from 'react';
import PropTypes from 'prop-types';

const Button = ({text, kind, otherClasses, clickAction, outline, size, disabled}) => {
  let style, btnSize;

  if (outline) {
    style=`btn-outline-${kind}`;
  } else {
    style = `btn-${kind}`
  }

  switch (size) {
    case 'large':
      btnSize = 'btn-lg';
      break;
    
    case 'small':
      btnSize = 'btn-sm';
      break;

    default:
      break;
  }

  return (
    <button
      className={`btn ${style} ${btnSize} ${otherClasses}`}
      onClick={clickAction}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  kind: PropTypes.string,
  outline: PropTypes.bool,
  otherClasses: PropTypes.string,
  clickAction: PropTypes.func,
  size: PropTypes.oneOf(['large', 'small']),
  disabled: PropTypes.bool
}

Button.defaultProps = {
  kind: 'primary',
  outline: false,
  disabled: false
}

export default Button;