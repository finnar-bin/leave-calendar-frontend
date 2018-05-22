import React from 'react';
import propTypes from 'prop-types';

const Error = (props) => {
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
  message: propTypes.string
}

export default Error;