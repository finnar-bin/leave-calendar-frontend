import React from 'react';
import propTypes from 'prop-types';

const Alert = ({dismissible, floating, type, message, clickAction}) => {
  let toDismiss = dismissible ? 'alert-dismissible' : '';
  let toFloat = floating ? 'alert-floating' : '';
  let vanityMessage = ''
  
  switch (type) {
    case 'danger':
      vanityMessage = 'Something went wrong, Cap!';
      break;
    
    case 'success':
      vanityMessage = 'Awww yeah!';
      break;

    default:
      break;
  }

  return (
    <div className={`alert alert-${type} ${toFloat} ${toDismiss} fade show`} role="alert">
      <span><strong>{vanityMessage}</strong> {message}.</span>
      {
        dismissible &&
        <button type="button" className="close" onClick={clickAction} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      }
    </div>
  );
};

Alert.propTypes = {
  dismissible: propTypes.bool,
  floating: propTypes.bool,
  type: propTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
  message: propTypes.string,
  clickAction: propTypes.func.isRequired
}

Alert.defaultProps = {
  dismissible: true,
  floating: false,
  type: 'primary'
}

export default Alert;