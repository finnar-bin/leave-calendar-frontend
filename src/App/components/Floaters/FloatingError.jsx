import React from 'react';
import propTypes from 'prop-types';

const FloatingError = (props) => {
  return (
    <div className="alert alert-danger alert-floating alert-dismissible fade show" role="alert">
      <span><strong>Something went wrong, Cap!</strong> {props.message}.</span>
      <button type="button" className="close" onClick={props.handleClose} aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

FloatingError.propTypes = {
  message: propTypes.string,
  handleClose: propTypes.func
}

export default FloatingError;