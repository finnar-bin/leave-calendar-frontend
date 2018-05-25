import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Alert from '../components/Alert';
import Button from '../components/Button';
import { authenticate } from '../utils/auth';
import { loginAdmin } from '../api';

class AdminLoginForm extends Component {
  state = {
    triggerError: false,
    errorMessage: ''
  }

  onLogin = async (e) => {
    e.preventDefault();  
    let admin = await loginAdmin(this.username.value, this.password.value);
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

  render() {
    return (
      <Fragment>
        {this.state.triggerError && <Alert kind="danger" dismissible={false} message={this.state.errorMessage}/>}
        <form onSubmit={this.onLogin}>
          <div className="input-group input-group-lg mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="username">Username</span>
            </div>
            <input ref={(u) => { this.username = u; }} type="text" className="form-control" aria-describedby="username" />
          </div>
          <div className="input-group input-group-lg mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="password">Password</span>
            </div>
            <input ref={(p) => { this.password = p; }} type="password" className="form-control" aria-describedby="password" />
          </div>
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
