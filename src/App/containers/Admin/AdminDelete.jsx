import React from 'react';
import propTypes from 'prop-types';

let handleSubmit = (id) => {
  
}

const AdminDelete = (props) => {
  return (
    <div className="modal__overlay">
      <div className="card p-3" style={{ minHeight: '10vh' }}>
        <h4 className="card-header">Delete User</h4>
        <div className="card-body">
          <p>Are you sure you want to delete this user? There′s no going back from here.</p>
        </div>
        <div className="text-center">
          <button className="btn btn-secondary mx-1" onClick={props.handleClose}>Close</button>
          <button className="btn btn-primary mx-1" onClick={handleSubmit(props.userId)}>Submit</button>
        </div>
      </div>
    </div>
  );
};

AdminDelete.propTypes = {
  userId: propTypes.string,
  handleClose: propTypes.func
}

export default AdminDelete;