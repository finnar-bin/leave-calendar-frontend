import React, { Component } from 'react';

import AdminNewForm from 'containers/Admin/AdminNewForm';
import Alert from 'components/Alert';

class New extends Component {
  state = {
    triggerError: false,
    triggerSuccess: false,
    errorMessage: '',
    successMessage: ''
  }

  /************* ACTIONS START **************/
  toLoad = (bool) => {
    this.setState({ triggerLoading: bool })
  }

  setSuccess = (message) => {
    this.setState({
      triggerSuccess: true,
      successMessage: message
    });
  }

  setError = (message) => {
    this.setState({
      triggerError: true,
      errorMessage: message
    });
  }
  /************* ACTIONS END **************/

  render() {
    return (
      <div className="text-center col-6 offset-3">
        <h1>Add new user</h1>
        <hr/>
        {this.state.triggerSuccess && <Alert kind="success" dismissible={false} message={this.state.successMessage} />}
        {this.state.triggerError && <Alert kind="danger" dismissible={false} message={this.state.errorMessage} />}
        <AdminNewForm toLoad={this.toLoad} onSuccess={this.setSuccess} onError={this.setError} />
      </div>
    );
  }
}

export default New;