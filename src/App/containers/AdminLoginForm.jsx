import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Alert from 'components/Alert';
import Button from 'components/Button';
import InputGroup from 'components/InputGroup';
import { authenticate } from 'utils/auth';
import { loginAdmin } from 'api';

class AdminLoginForm extends Component {
  state = {
    triggerError: false,
    errorMessage: '',
    username: '',
    password: ''
  }

  /************* ACTIONS START **************/
  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onLogin = async (e) => {
    e.preventDefault();  
    let admin = await loginAdmin(this.state.username, this.state.password);
    if (admin.error) {
      console.log(admin.error);
      this.setState({
        triggerError: true,
        errorMessage: admin.error.data.errorStack
      });
    } else {
      localStorage.setItem('token', admin.data.token);
      authenticate();
      this.props.history.push("/admin/users");
    }
  }
  /************* ACTIONS END **************/

  render() {
    return (
      <Fragment>
        {this.state.triggerError && <Alert kind="danger" dismissible={false} message={this.state.errorMessage}/>}
        <form onSubmit={this.onLogin}>
          <InputGroup
            prependText="Username"
            size="large"
            type="text"
            otherClasses="mb-3"
            changeAction={this.handleUsername}
            focus
          />
          <InputGroup
            prependText="Password"
            size="large"
            type="password"
            otherClasses="mb-3"
            changeAction={this.handlePassword}
          />
          <Button text="Submit" />
        </form>
      </Fragment>
    );
  }
}

AdminLoginForm.propTypes = {
  history: PropTypes.object
}

export default AdminLoginForm;
