import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({header, children}) => (
  <div className="modal__overlay">
    <div className="card p-3" style={{ minHeight: '10vh' }}>
      <h4 className="card-header">{header}</h4>
      <div className="card-body">
        {children}
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.object
}

export default Modal;