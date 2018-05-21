import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';

import Modal from './Modal';

class Table extends Component {
  state = {
    triggerModal: false,
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

  onClose = (bool) => {
    this.setState({ triggerModal: bool })
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

        {this.state.triggerModal && <Modal handleClose={() => this.onClose()} userInfo={this.state.toEdit}/>}
      </Fragment>
    );
  }
};

Table.propTypes = {
  users: propTypes.array
}

export default Table;