import React, { Component } from 'react';
import propTypes from 'prop-types';

import { updateUser } from '../../api';

class Update extends Component {
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


  handleSubmit = async () => {
    let user = await updateUser(this.props.userInfo._id, this.state.fullName, this.state.leaveCredits);
    if (user.error) {
      this.props.onError(user.error.data.message);
      this.props.handleClose();
    } else {
      this.props.onSuccess(user.data.message);
      this.props.handleClose();
    }
  }
  
  render() {
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
              <button className="btn btn-secondary mx-1" onClick={this.props.handleClose}>Close</button>
              <button className="btn btn-primary mx-1" onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Update.propTypes = {
  handleClose: propTypes.func,
  userInfo: propTypes.object,
  onSuccess: propTypes.func,
  onError: propTypes.func
}
export default Update;