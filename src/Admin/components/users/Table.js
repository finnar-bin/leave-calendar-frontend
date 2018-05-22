import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';

import Modal from './Modal';
import Success from '../../../common/Alerts/Floating/Success';
import Error from '../../../common/Alerts/Floating/Error';

class Table extends Component {
  state = {
    triggerModal: false,
    triggerSuccess: false,
    triggerError: false,
    successMessage: '',
    errorMessage: '',
    toEdit: [],
  }

  onEdit = (userdata) => {
    this.setState({
      triggerModal: true,
      toEdit: userdata
    });
  }

  onRemove = (userid) => {
    console.log('Remove', userid);
  }

  onClose = () => {
    this.setState({ triggerModal: false })
  }

  isSuccess = (message) => {
    this.setState({
      triggerSuccess: true,
      successMessage: message
    });
    this.props.refetch();
  }

  isError = (message) => {
    this.setState({
      triggerError: true,
      errorMessage: message
    });
  }

  render() {
    let users = this.props.users.map((data) => {
      return (
        <tr key={data._id}>
          <td>{data.fullName}</td>
          <td>{Math.ceil(data.leaveCredits * 100)/100}</td>
          <td>
            <button
              className="btn btn-outline-success btn-sm mx-1"
              onClick={() => this.onEdit(data)}>
              Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm mx-1"
              onClick={() => this.onRemove(data._id)}>
              Remove
            </button>
          </td>
        </tr>
      )
    });

    return (
      <Fragment>
        <table className="table table-hover text-center">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Leave Credits</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>

        {this.state.triggerModal && <Modal handleClose={this.onClose} userInfo={this.state.toEdit} onSuccess={this.isSuccess} onError={this.isError} />}
        {this.state.triggerSuccess && <Success message={this.state.successMessage} />}
        {this.state.triggerError && <Error message={this.state.errorMessage} />}
      </Fragment>
    );
  }
}

Table.propTypes = {
  users: propTypes.array,
  refetch: propTypes.func
}

export default Table;