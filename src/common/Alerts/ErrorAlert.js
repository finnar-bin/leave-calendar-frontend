import React from 'react';
import PropTypes from 'prop-types';

const ErrorAlert = (props) => {
  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Something went wrong, Cap!</strong>
      <br />
      {props.message}.
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string
}

export default ErrorAlert;