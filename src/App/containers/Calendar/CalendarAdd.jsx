import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import RadioButton from '../../components/RadioButton';
import { addLeave } from '../../api';
import TimePicker from '../../components/TimePicker';
import { computeCredit } from '../../utils/computeCredits';

class CalendarAdd extends Component {
  state = {
    status: 'Pending',
    type: 'Vacation Leave',
    time: 'All Day',
    username: '',
    timeFrom: '09:00 AM',
    timeTo: '06:00 PM',
    isCustomTime: false
  }
  
  /************* ACTIONS START **************/
  handleStatusChange = (e) => {
    this.setState({ status: e.target.value })
  }

  handleTypeChange = (e) => {
    this.setState({ type: e.target.value })
  }

  handleTimeChange = (e) => {
    switch (e.target.value) {
      case 'All Day':
        this.setState({
          time: 'All Day',
          timeFrom: '09:00 AM',
          timeTo: '06:00 PM',
          isCustomTime: false
        });
        break;

      case 'Half Day':
        this.setState({
          time: 'Half Day',
          timeFrom: '09:00 AM',
          timeTo: '02:00 PM',
          isCustomTime: false
        });
        break;

      case 'Custom':
        this.setState({
          time: 'Custom',
          isCustomTime: true
        });
        break;

      default:
        break;
    }
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

    // If type is VL then deduct appropriate credits, if LWOP deduct 0
    let toDeduct = 0;
    if (this.state.type === 'Vacation Leave') toDeduct = computeCredit(from, to);

    let leave = await addLeave(localStorage.getItem('userId'), this.state.status, this.state.type, from, to, toDeduct);
    if (leave.error) {
      this.props.onError('Failed to add the leave');
      this.props.closeModal();
    } else {
      this.props.onSuccess('Leave successfully added');
      this.props.closeModal();
    }
  }
  /************* ACTIONS END **************/

  render() {
    return (
      <Modal header="Request A Leave">
        <div className="text-center mb-3"><FontAwesomeIcon icon="user-circle" size="7x"/></div>
        <div className="mb-4 text-center" >
          <h2 className="card-title">{this.state.username}</h2>
          <h6 className="card-subtitle text-muted">NAME</h6>
        </div>

        {/* TIME PICKER */}
        <div className="mb-4 text-center">
          <div className="mb-2">
            <RadioButton
              id="time-allDay"
              name="time"
              text="All Day"
              checked={this.state.time === 'All Day' ? true : false}
              value="All Day"
              changeAction={this.handleTimeChange}
            />
            <RadioButton
              id="time-halfDay"
              name="time"
              text="Half Day"
              checked={this.state.time === 'Half Day' ? true : false}
              value="Half Day"
              changeAction={this.handleTimeChange}
            />
            <RadioButton
              id="time-custom"
              name="time"
              text="Custom"
              checked={this.state.time === 'Custom' ? true : false}
              value="Custom"
              changeAction={this.handleTimeChange}
            />
          </div>
          { this.state.isCustomTime &&
            <div className="d-flex justify-content-center mb-2">
              <form className="form-inline">
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
          }
          <h6 className="card-subtitle text-muted">TIME</h6>
        </div>

        {/* TYPE PICKER */}
        <div className="mb-4 text-center">
          <div className="mb-2">
            <RadioButton
              id="type-vl"
              name="type"
              text="Vacation Leave"
              checked={this.state.type === 'Vacation Leave' ? true : false}
              value="Vacation Leave"
              changeAction={this.handleTypeChange}
            />
            <RadioButton
              id="type-lwop"
              name="type"
              text="Leave Without Pay"
              checked={this.state.type === 'Leave Without Pay' ? true : false}
              value="Leave Without Pay"
              changeAction={this.handleTypeChange}
            />
          </div>
          <h6 className="card-subtitle text-muted">TYPE</h6>
        </div>

        {/* STATUS PICKER */}
        <div className="mb-4 text-center">
          <div className="mb-2">
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
          <h6 className="card-subtitle text-muted">STATUS</h6>
        </div>

        {/* BUTTONS */}
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