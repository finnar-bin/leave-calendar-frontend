import React from 'react';
import PropTypes from 'prop-types';

/**
 * Creates a custom modal with complete styling
 * @param {string} header text to be displayed on the modal header
 * @param {object} children content to be placed on the modal body 
 */
const Modal = ({header, children}) => (
  <div className="modal__overlay">
    <div className="card p-3" style={{ minHeight: '10vh', minWidth: '22vw' }}>
      <h1 className="card-header text-center">{header}</h1>
      <div className="card-body">
        {children}
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.array
}

export default Modal;