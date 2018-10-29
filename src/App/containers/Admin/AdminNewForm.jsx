import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

import InputGroup from "../../components/InputGroup";
import Button from "../../components/Button";
import { clean } from "../../utils/clean";
import { newUser } from "../../api";

class AdminNewForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    leaveCredits: 0
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async () => {
    let user = await newUser(
      clean(this.state.firstName),
      clean(this.state.lastName),
      this.state.leaveCredits
    );
    if (user.error) {
      this.props.onError(user.error.data.message);
    } else {
      this.props.onSuccess(user.data.message);
      this.setState({
        firstName: "",
        lastName: "",
        leaveCredits: 0
      });
    }
  };

  render() {
    return (
      <Fragment>
        <InputGroup
          prependText="First Name"
          size="large"
          type="text"
          otherClasses="mb-3"
          value={this.state.firstName}
          changeAction={this.handleChange}
          name="firstName"
          placeholder="John"
        />
        <InputGroup
          prependText="Last Name"
          size="large"
          type="text"
          otherClasses="mb-3"
          value={this.state.lastName}
          changeAction={this.handleChange}
          name="lastName"
          placeholder="Wick"
        />
        <InputGroup
          prependText="Leave Credits"
          size="large"
          type="number"
          otherClasses="mb-3"
          value={this.state.leaveCredits}
          changeAction={this.handleChange}
          name="leaveCredits"
        />
        <Button
          text="Submit"
          kind="primary"
          size="large"
          clickAction={this.handleSubmit}
        />
      </Fragment>
    );
  }
}

AdminNewForm.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func
};

export default AdminNewForm;
