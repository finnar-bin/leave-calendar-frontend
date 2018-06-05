import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import RadioButton from '../../components/RadioButton';
import { addLeave } from '../../api';
import TimePicker from '../../components/TimePicker';
import { computeCredit } from '../../utils/computeDays';

class CalendarAdd extends Component {
  state = {
    status: 'Pending',
    type: 'Whole Day',
    username: '',
    timeFrom: '09:00 AM',
    timeTo: '06:00 PM'
  }
  
  handleStatusChange = (e) => {
    this.setState({ status: e.target.value })
  }

  handleTimeFrom = (e) => {
    this.setState({ timeFrom: e.target.value })
  }

  handleTimeTo = (e) => {
    this.setState({ timeTo: e.target.value })
  }

  handleSubmit = async () => {
    let from = `${this.props.from} ${this.state.timeFrom}`;
    let to = `${this.props.to} ${this.state.timeTo}`;
    let toDeduct = computeCredit(from, to);
    let leave = await addLeave(localStorage.getItem('userId'), this.state.status, from, to, toDeduct);
    if (leave.error) {
      this.props.onError('Failed to add the leave');
      this.props.closeModal();
    } else {
      let newLeave = {
        id: leave.data.data._id,
        name: localStorage.getItem('name'),
        start: new Date(leave.data.data.start),
        end: new Date(leave.data.data.end),
        status: leave.data.data.status
      }
      this.props.onSuccess('Leave successfully added', newLeave, 'add');
      this.props.closeModal();
      // console.log(computeCredit(this.state.timeFrom, this.state.timeTo));
      
    }
  }

  render() {
    return (
      <Modal header="Request A Leave">
        <div className="mb-3" >Name: <strong>{this.state.username}</strong></div>
        <div className="mb-3" >
          <span>Inclusive Dates:</span>
          <div className="ml-3">
            <span>From: <strong>{this.props.from}</strong></span>
            <br />
            <span>To: <strong>{this.props.to}</strong></span>
          </div>
        </div>
        <div className="mb-4">
          <label>Time:</label>
          <form className="form-inline ml-3">
            <label className="mx-2">From</label>
            <TimePicker
              changeAction={this.handleTimeFrom}
              value={this.state.timeFrom}
            />
            <label className="mx-2">To</label>
            <TimePicker
              changeAction={this.handleTimeTo}
              value={this.state.timeTo}
            />
          </form>
        </div>
        <div className="mb-4">
          <label>Status:</label>
          <div className="ml-3">
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

  componentDidMount() {
    this.setState({
      username: localStorage.getItem('name')
    });
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