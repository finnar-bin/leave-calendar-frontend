import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../components/Modal';
import Button from '../../components/Button';

const CalendarRemove = (props) => {
  let handleSubmit = () => {
    alert('remove')
  }

  return (
    <Modal header="Remove Leave">
      <p>Do you really want to remove this event?</p>
      <div className="text-center">
        <Button
          text="Close"
          otherClasses="mx-1"
          clickAction={props.closeModal}
        />
        <Button
          text="Remove"
          kind="danger"
          otherClasses="mx-1"
          clickAction={() => handleSubmit()}
        />
      </div>
    </Modal>
  );
}

CalendarRemove.propTypes = {
  closeModal: PropTypes.func
}

export default CalendarRemove;