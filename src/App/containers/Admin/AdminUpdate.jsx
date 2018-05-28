import React, { Component } from 'react';
import propTypes from 'prop-types';

import { updateUser } from '../../api';
import { clean } from '../../utils/clean';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import InputGroup from '../../components/InputGroup';

class AdminUpdate extends Component {
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
    let user = await updateUser(this.props.userInfo._id, clean(this.state.fullName), this.state.leaveCredits);
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
      <Modal header="Update User">
        <InputGroup
          prependText="Full Name"
          type="text"
          otherClasses="mb-3"
          value={this.state.fullName}
          changeAction={this.handleNameChange}
        />
        <InputGroup
          prependText="Leave Credits"
          type="number"
          otherClasses="mb-3"
          value={this.state.leaveCredits}
          changeAction={this.handleCreditsChange}
        />
        <div className="text-center">
          <Button
            text="Close"
            otherClasses="mx-1"
            kind="secondary"
            clickAction={this.props.handleClose}
          />
          <Button
            text="Submit"
            otherClasses="mx-1"
            clickAction={this.handleSubmit}
          />
        </div>
      </Modal> 
    );
  }
}

AdminUpdate.propTypes = {
  handleClose: propTypes.func,
  userInfo: propTypes.object,
  onSuccess: propTypes.func,
  onError: propTypes.func
}
export default AdminUpdate;