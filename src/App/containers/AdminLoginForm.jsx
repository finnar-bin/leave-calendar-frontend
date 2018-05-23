import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';

import AlertError from '../components/Alert/Error';
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
        {this.state.triggerError && <AlertError message={this.state.errorMessage}/>}
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
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </Fragment>
    );
  }
}

AdminLoginForm.propTypes = {
  history: propTypes.object
}

export default AdminLoginForm;
