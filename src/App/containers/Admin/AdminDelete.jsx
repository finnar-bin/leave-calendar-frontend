import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../components/Modal';
import Button from '../../components/Button';

let handleSubmit = (id) => {
  
}

const AdminDelete = (props) => {
  return (
    <Modal header="Delete User">
      <p>Are you sure you want to delete this user? There′s no going back from here.</p>
      <div className="text-center">
        <Button
          text="Close"
          otherClasses="mx-1"
          kind="secondary"
          clickAction={props.handleClose}
        />
        <Button
          text="Submit"
          otherClasses="mx-1"
          clickAction={handleSubmit(props.userId)}
        />
      </div>
    </Modal>
  );
};

AdminDelete.propTypes = {
  userId: PropTypes.string,
  handleClose: PropTypes.func
}

export default AdminDelete;