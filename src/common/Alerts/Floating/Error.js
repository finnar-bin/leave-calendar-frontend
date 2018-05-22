import React from 'react';
import propTypes from 'prop-types';

import './FloatingStyles.css';

const Error = (props) => {
  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <span><strong>Something went wrong, Cap!</strong> {props.message}.</span>
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