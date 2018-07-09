import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import AdminUpdate from './AdminUpdate';
import AdminDelete from './AdminDelete';
import Alert from '../../components/Alert';
import Button from '../../components/Button';

class UserTable extends Component {
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

  /********* ACTIONS START **********/
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
    this.setState({
      triggerUpdateModal: false,
      triggerDeleteModal: false
    })
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
  /********* ACTIONS END **********/

  render() {
    let users = this.props.users.map((data) => {
      return (
        <tr key={data._id}>
          <td>{data.fullName}</td>
          <td>{Math.ceil(data.leaveCredits * 100)/100}</td>
          <td>
            <Button
              text="Edit"
              kind="success"
              otherClasses="mx-1"
              size="small"
              outline={true}
              clickAction={() => this.onEdit(data)}
            />
            <Button
              text="Remove"
              kind="danger"
              otherClasses="mx-1"
              size="small"
              outline={true}
              clickAction={() => this.onRemove(data._id)}
            />
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

        {this.state.triggerUpdateModal && <AdminUpdate handleClose={this.onClose} userInfo={this.state.toEdit} onSuccess={this.isSuccess} onError={this.isError} />}
        {this.state.triggerDeleteModal && <AdminDelete handleClose={this.onClose} userId={this.state.toDelete} onSuccess={this.isSuccess} onError={this.isError} />}
        {this.state.triggerSuccess && <Alert floating={true} kind="success" message={this.state.successMessage} clickAction={this.onAlertClose} />}
        {this.state.triggerError && <Alert floating={true} kind="danger" message={this.state.errorMessage} clickAction={this.onAlertClose} />}
      </Fragment>
    );
  }
}

UserTable.propTypes = {
  users: PropTypes.array,
  refetch: PropTypes.func
}

export default UserTable;