import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { removeUser } from '../../api';


const AdminDelete = (props) => {
  let handleSubmit = async (id) => {
    let user = await removeUser(id);
    if (user.error) {
      props.onError(user.error.data.message);
      props.handleClose();
    } else {
      props.onSuccess(user.data.message);
      props.handleClose();
    }
  }

  return (
    <Modal header="Delete User">
      <p>Are you sure you want to delete this user? There′s no going back from here.</p>
      <div className="text-center">
        <Button
          text="Cancel"
          otherClasses="mx-1"
          kind="secondary"
          clickAction={props.handleClose}
        />
        <Button
          text="Remove"
          kind="danger"
          otherClasses="mx-1"
          clickAction={() => handleSubmit(props.userId)}
        />
      </div>
    </Modal>
  );
};

AdminDelete.propTypes = {
  userId: PropTypes.string,
  handleClose: PropTypes.func,
  onError: PropTypes.func,
  onSuccess: PropTypes.func
}

export default AdminDelete;