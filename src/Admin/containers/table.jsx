import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';

import Update from './update';
import Delete from '../components/delete';
import Success from '../../common/floating/success';
import Error from '../../common/floating/error';

class Table extends Component {
  state = {
    triggerUpdateModal: false,
    triggerDeleteModal: false,
    triggerSuccess: false,
    triggerError: false,
    successMessage: '',
    errorMessage: '',
    toEdit: [],
    toDelete: '',
  }

  onEdit = (userdata) => {
    this.setState({
      triggerUpdateModal: true,
      toEdit: userdata
    });
  }

  onRemove = (userid) => {
    this.setState({
      triggerDeleteModal: true,
      toDelete: userid
    });
  }

  onClose = () => {
    this.setState({ triggerUpdateModal: false })
  }

  onAlertClose = () => {
    this.setState({
      triggerError: false,
      triggerSuccess: false
    })
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

        {this.state.triggerUpdateModal && <Update handleClose={this.onClose} userInfo={this.state.toEdit} onSuccess={this.isSuccess} onError={this.isError} />}
        {this.state.triggerDeleteModal && <Delete handleClose={this.onClose} userId={this.state.toDelete} />}
        {this.state.triggerSuccess && <Success message={this.state.successMessage} handleClose={this.onAlertClose} />}
        {this.state.triggerError && <Error message={this.state.errorMessage} handleClose={this.onAlertClose} />}
      </Fragment>
    );
  }
}

Table.propTypes = {
  users: propTypes.array,
  refetch: propTypes.func
}

export default Table;