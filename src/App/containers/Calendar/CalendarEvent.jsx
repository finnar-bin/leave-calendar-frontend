import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { deleteLeave, updateLeave } from '../../api';
import { isAfterToday } from '../../utils/checkDays';
import { computeCredit } from '../../utils/computeCredits';
import RadioButton from '../../components/RadioButton';

const formatDate = (date) => (
  moment(date).format('M/D/YYYY h:mm A')
);

const validateEvent = (startDate, username) => {
  if (isAfterToday(startDate) && username === localStorage.getItem('name')) {
    return true;
  }
  return false;
}

class CalendarEvent extends Component {
  state = {
    showStatusForm: false,
    status: this.props.event.status
  }

  handleDelete = async (id, type) => {
    let { event } = this.props;

    // If type is VL then add appropriate credits, if LWOP add 0
    let toAdd = 0;
    if (type === 'Vacation Leave') toAdd = computeCredit(formatDate(event.start), formatDate(event.end));

    let leave = await deleteLeave(id, toAdd, localStorage.getItem('userId'));
    if (leave.error) {
      this.props.onError('Failed to remove event');
      this.props.closeModal();
    } else {
      this.props.onSuccess('Leave successfully removed');
      this.props.closeModal();
    }
  }

  handleStatusChange = (e) => {
    this.setState({ status: e.target.value });
  }

  openStatusForm = () => {
    let { event } = this.props;
    if (validateEvent(event.start, event.name)) {
      this.setState({ showStatusForm: true });
    }
  }

  closeStatusForm = () => {
    this.setState({ showStatusForm: false });
  }

  saveChanges = async (id) => {
    let updatedLeave = await updateLeave(id, this.state.status);
    if (updatedLeave.error) {
      this.props.onError('Failed to update event');
      this.props.closeModal();
    } else {
      this.props.onSuccess('Leave status updated');
      this.props.closeModal();
    }
  }
  
  render() {
    let { event } = this.props;
    return (
      <Modal header="Leave Information">
        <div className="text-center mb-3"><FontAwesomeIcon icon="user-circle" size="7x"/></div>
        <div className="mb-4 text-center" >
          <h2 className="card-title">{event.name}</h2>
          <h6 className="card-subtitle text-muted">NAME</h6>
        </div>
        <div className="mb-4 text-center">
          <h5 className="card-title"><strong>{moment(event.start).format('MMM D, YYYY h:mm A')} to {moment(event.end).format('MMM D, YYYY h:mm A')}</strong></h5>
          <h6 className="card-subtitle text-muted">INCLUSIVE DATES</h6>
        </div>
        <div className="mb-4 text-center">
          <h2 className="card-title">{event.type}</h2>
          <h6 className="card-subtitle text-muted">TYPE</h6>
        </div>

        {/* only show the status update radio buttons once the edit button has been clicked */}
        <div className="mb-4 text-center">
          {
            this.state.showStatusForm ?
              <div className="mb-2 text-center">
                <RadioButton
                  id="status-pending"
                  name="status"
                  text="Pending"
                  checked={this.state.status === 'Pending' ? true : false}
                  value="Pending"
                  changeAction={this.handleStatusChange}
                />
                <RadioButton
                  id="status-approved"
                  name="status"
                  text="Approved"
                  checked={this.state.status === 'Approved' ? true : false}
                  value="Approved"
                  changeAction={this.handleStatusChange}
                />
              </div>
            :
              <h2 className="card-title">{event.status}</h2>
                
          }
          <h6 className="card-subtitle text-muted">
            STATUS
            &nbsp;
            {validateEvent(event.start, event.name) && this.state.showStatusForm === false ? <a onClick={this.openStatusForm} style={{'cursor' : 'pointer'}}><FontAwesomeIcon icon="edit" /></a> : ''}
          </h6>
        </div>

        {/* buttons will change depending if the status edit button has been clicked */}
        <div className="text-center">
          {
            this.state.showStatusForm === false ?
              <Fragment>
                <Button
                  text="Close"
                  kind="secondary"
                  otherClasses="mx-1"
                  clickAction={this.props.closeModal}
                />
                {
                  validateEvent(event.start, event.name)
                  &&
                  <Button
                    text="Delete"
                    kind="danger"
                    otherClasses="mx-1"
                    clickAction={() => this.handleDelete(event.id, event.type)}
                  />
                }
              </Fragment>
            :
              <Fragment>
                <Button
                  text="Cancel"
                  kind="secondary"
                  otherClasses="mx-1"
                  clickAction={this.closeStatusForm}
                />
                <Button
                  text="Save"
                  kind="success"
                  otherClasses="mx-1"
                  clickAction={() => this.saveChanges(event.id)}
                />
              </Fragment>
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