import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Modal from 'components/Modal';
import Button from 'components/Button';
import { deleteLeave } from 'api';
import { isAfterToday } from 'utils/checkDays';
import { computeCredit } from 'utils/computeCredits';

const formatDate = (date) => (
  moment(date).format('M/D/YYYY h:mm A')
);

class CalendarEvent extends Component {
  handleDelete = async (id) => {
    let { event } = this.props;
    let toAdd = computeCredit(formatDate(event.start), formatDate(event.end));
    let leave = await deleteLeave(id, toAdd);
    if (leave.error) {
      this.props.onError('Failed to remove event');
      this.props.closeModal();
    } else {
      this.props.onSuccess('Leave successfully removed', this.props.event, 'remove');
      this.props.closeModal();
    }
  }
  
  render() {
    let { event } = this.props;
    return (
      <Modal header="Leave Information">
        <div className="mb-4 text-center" >
          <h2 className="card-title">{event.name}</h2>
          <h6 className="card-subtitle text-muted">NAME</h6>
        </div>
        <div className="mb-4 text-center">
          <h5 className="card-title"><strong>{event.start.toLocaleString()} to {event.end.toLocaleString()}</strong></h5>
          <h6 className="card-subtitle text-muted">INCLUSIVE DATES</h6>
        </div>
        <div className="mb-4 text-center">
          <h2 className="card-title">{event.status}</h2>
          <h6 className="card-subtitle text-muted">STATUS</h6>
        </div>
        <div className="text-center">
          <Button
            text="Close"
            kind="secondary"
            otherClasses="mx-1"
            clickAction={this.props.closeModal}
          />
          {
            isAfterToday(event.start)
            &&
            <Button
              text="Delete"
              kind="danger"
              otherClasses="mx-1"
              clickAction={() => this.handleDelete(event.id)}
            />
          }
        </div>
      </Modal>
    );
  }
}

CalendarEvent.propTypes = {
  closeModal: PropTypes.func,
  event: PropTypes.object,
  onError: PropTypes.func,
  onSuccess: PropTypes.func
}

export default CalendarEvent;