import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import { clean } from '../../utils/clean';
import { newUser } from '../../api';

class AdminNewForm extends Component {
  state = {
    fullName: '',
    leaveCredits: 0
  }

  handleName = (e) => {
    this.setState({ fullName: e.target.value });
  }

  handleCredits = (e) => {
    this.setState({ leaveCredits: e.target.value });
  }

  handleSubmit = async () => {
    let user = await newUser(clean(this.state.fullName), clean(this.state.leaveCredits));
    if (user.error) {
      this.props.onError(user.error.data.message);
    } else {
      this.props.onSuccess(user.data.message);
      this.setState({
        fullName: '',
        leaveCredits: 0
      })
    }
  }

  render() {
    return (
      <Fragment>
        <InputGroup
          prependText="Full Name"
          size="large"
          type="text"
          otherClasses="mb-3"
          value={this.state.fullName}
          changeAction={this.handleName}
        />
        <InputGroup
          prependText="Leave Credits"
          size="large"
          type="number"
          otherClasses="mb-3"
          value={this.state.leaveCredits}
          changeAction={this.handleCredits}
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
}

export default AdminNewForm;