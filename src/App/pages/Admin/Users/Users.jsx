import React, { Component, Fragment } from 'react';

import UserTable from 'containers/Admin/UserTable';
import Loader from 'components/Loader';
import { getUsers } from 'api';

class Users extends Component {
  state = {
    users: [],
    openModal: false,
    triggerLoading: true,
    noResult: false
  }

  fetchUsers = async () => {
    let users = await getUsers();
    if (users.error) {
      console.log(users.error.data.message);
    } else {
      this.setState({
        users: users.data.data,
        triggerLoading: false
      });
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.triggerLoading && <Loader />}
        {this.state.triggerLoading === false && this.state.users.length !== 0 && <UserTable users={this.state.users} refetch={this.fetchUsers}/>}
        {this.state.triggerLoading === false && this.state.users.length === 0 && "No result."}
      </Fragment>
    );
  }

  componentDidMount() {
    this.fetchUsers();
  }
}

export default Users;