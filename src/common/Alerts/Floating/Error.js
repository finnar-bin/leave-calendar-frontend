import React from 'react';
import propTypes from 'prop-types';

import './FloatingStyles.css';

const Error = (props) => {
  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <span><strong>Something went wrong, Cap!</strong> {props.message}.</span>
      <button type="button" className="close" onClick={props.handleClose} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

Error.propTypes = {
  message: propTypes.string,
  handleClose: propTypes.func
}

export default Error;