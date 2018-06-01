import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../components/Modal';
import Button from '../../components/Button';

class CalendarEvent extends Component {
  render() {
    return (
      <Modal header="Leave Information">
        <div className="mb-3" >Name: <strong>{this.state.username}</strong></div>
        <div className="mb-3" >
          <span>Inclusive Dates:</span>
          <div className="ml-3">
            <span>From: <strong>{this.props.from}</strong></span>
            <br />
            <span>To: <strong>{this.props.to}</strong></span>
          </div>
        </div>
      </Modal>
    );
  }
}

export default CalendarEvent;