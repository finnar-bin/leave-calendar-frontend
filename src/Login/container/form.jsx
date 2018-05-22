import React, { Component, Fragment } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';

import Error from '../../common/alerts/error';
import { authenticate } from '../../__utils/auth';

class LoginForm extends Component {
  state = {
    loginError: false,
    error: ''
  }

  onLogin = (e) => {
    e.preventDefault();
    let username = this.username.value;
    let password = this.password.value;
    
    axios.post(`${process.env.REACT_APP_API_GATEWAY}/admin/signin`, {
      userName: username,
      password
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
      authenticate();
      this.props.history.push("/admin");
    }).catch(error => this.setState({
      error: error.response.data.errorStack,
      loginError: true
    }));
  }

  render() {
    return (
      <Fragment>
        {this.state.loginError && <Error message={this.state.error}/>}
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

LoginForm.propTypes = {
  history: propTypes.object
}

export default LoginForm;
