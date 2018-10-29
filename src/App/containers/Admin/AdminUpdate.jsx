import React, { Component } from "react";
import propTypes from "prop-types";

import { updateUser } from "../../api";
import { clean } from "../../utils/clean";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import InputGroup from "../../components/InputGroup";

class AdminUpdate extends Component {
  state = {
    firstName: this.props.userInfo.firstName,
    lastName: this.props.userInfo.lastName,
    leaveCredits: Math.ceil(this.props.userInfo.leaveCredits * 100) / 100
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async () => {
    let user = await updateUser(
      this.props.userInfo._id,
      clean(this.state.firstName),
      clean(this.state.lastName),
      this.state.leaveCredits
    );
    if (user.error) {
      this.props.onError(user.error.data.message);
      this.props.handleClose();
    } else {
      this.props.onSuccess(user.data.message);
      this.props.handleClose();
    }
  };

  render() {
    return (
      <Modal header="Update User">
        <InputGroup
          prependText="First Name"
          type="text"
          otherClasses="mb-3"
          value={this.state.firstName}
          changeAction={this.handleChange}
          name="firstName"
        />
        <InputGroup
          prependText="Last Name"
          type="text"
          otherClasses="mb-3"
          value={this.state.lastName}
          changeAction={this.handleChange}
          name="lastName"
        />
        <InputGroup
          prependText="Leave Credits"
          type="number"
          otherClasses="mb-3"
          value={this.state.leaveCredits}
          changeAction={this.handleChange}
          name="leaveCredits"
        />
        <div className="text-center">
          <Button
            text="Cancel"
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
};
export default AdminUpdate;
