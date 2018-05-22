import React from 'react';
import propTypes from 'prop-types';

import './FloatingStyles.css';

const Success = (props) => {
  return (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
      <span><strong>Awww yeah! </strong> {props.message}.</span>
      <button type="button" className="close" onClick={props.handleClose} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

Success.propTypes = {
  message: propTypes.string,
  handleClose: propTypes.func
}

export default Success;