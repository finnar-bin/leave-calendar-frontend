import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import './Modal.css';

class Modal extends Component {
  state = {
    fullName: this.props.userInfo.fullName,
    leaveCredits: Math.ceil(this.props.userInfo.leaveCredits*100)/100
  }

  handleNameChange = (e) => {
    this.setState({ fullName: e.target.value })
  }

  handleCreditsChange = (e) => {
    this.setState({ leaveCredits: e.target.value })
  }

  handleSubmit = () => {
    axios.patch(`${process.env.REACT_APP_API_GATEWAY}/user/${this.props.userInfo._id}`, {
      fullName: this.state.fullName,
      leaveCredits: this.state.leaveCredits
    }, {
      headers: {
        'x-auth': localStorage.getItem('token')
      }
    }).then((response) => {
      this.props.onSuccess(response.message);
      this.props.handleClose();
    }).catch(error => console.log(error.response.data.errorStack));
  }
  
  render() {
    console.log(this.props.userInfo);
    return (
      <div className="modal__overlay">
        <div className="card p-3" style={{ minHeight: '10vh' }}>
          <h4 className="card-header">Edit User</h4>
          <div className="card-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="fullname">Full Name</span>
              </div>
              <input
                className="form-control"
                type="text"
                aria-describedby="username"
                value={this.state.fullName}
                onChange={this.handleNameChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="leaveCredits">Leave Credits</span>
              </div>
              <input
                className="form-control"
                type="number"
                aria-describedby="leaveCredits"
                value={this.state.leaveCredits}
                onChange={this.handleCreditsChange}
              />
            </div>
            <div className="text-center">
              <button className="btn btn-primary mx-1" onClick={this.handleSubmit}>Submit</button>
              <button className="btn btn-warning mx-1" onClick={this.props.handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  handleClose: propTypes.func,
  userInfo: propTypes.object,
  onSuccess: propTypes.func
}
export default Modal;