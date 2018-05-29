import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import RadioButton from '../../components/RadioButton';
import { addLeave } from '../../api';

let username = localStorage.getItem('name');

class CalendarAdd extends Component {
  state = {
    status: 'Pending',
    type: 'Whole Day'
  }
  
  handleStatusChange = (e) => {
    this.setState({ status: e.target.value })
  }

  handleTypeChange = (e) => {
    this.setState({ type: e.target.value })
  }

  handleSubmit = async () => {
    let leave = await addLeave(localStorage.getItem('userId'), this.state.status, this.props.from, this.props.to, this.state.type);
    if (leave.error) {
      this.props.onError();
      this.props.closeModal();
    } else {
      console.log(leave);
      let newLeave = {
        id: leave.data.data._id,
        name: localStorage.getItem('name'),
        type: leave.data.data.type,
        start: new Date(`${leave.data.data.start} 12:00`),
        end: new Date(`${leave.data.data.end} 12:00`)
      }
      this.props.onSuccess(newLeave);
      this.props.closeModal();
    }
  }

  render() {
    return (
      <Modal header="Request A Leave">
        <div className="mb-3" >Name: <strong>{username}</strong></div>
        <div className="mb-3" >
          <span>Inclusive Dates:</span>
          <div className="ml-3">
            <span>From: <strong>{this.props.from}</strong></span>
            <br />
            <span>To: <strong>{this.props.to}</strong></span>
          </div>
        </div>
        <div className="mb-3" >Type: <br />
          <RadioButton
            id="type-whole"
            name="type"
            text="Whole Day"
            checked={this.state.type === 'Whole Day' ? true : false}
            value="Whole Day"
            changeAction={this.handleTypeChange}
          />
          <RadioButton
            id="type-half"
            name="type"
            text="Half Day"
            checked={this.state.type === 'Half Day' ? true : false}
            value="Half Day"
            changeAction={this.handleTypeChange}
          />
        </div>
        <div className="mb-4" >Status: <br />
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
        <div className="text-center">
          <Button
            text="Cancel"
            kind="secondary"
            otherClasses="mx-1"
            clickAction={this.props.closeModal}
          />
          <Button
            text="Submit"
            kind="primary"
            otherClasses="mx-1"
            clickAction={this.handleSubmit}
          />
        </div>
      </Modal>
    );
  }
}

CalendarAdd.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  closeModal: PropTypes.func,
  onError: PropTypes.func,
  onSuccess: PropTypes.func
}

export default CalendarAdd;