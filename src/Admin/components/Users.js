import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Table from './users/Table';
import Loader from '../../common/Loader/Loader';

class Users extends Component {
  state = {
    users: [],
    openModal: false,
    triggerLoading: true,
    noResult: false
  }

  /**
   * Fetch list of users from database
   * @returns {array} list of all users
   */
  fetchUsers = () => {
    axios.get(`${process.env.REACT_APP_API_GATEWAY}/user`)
      .then((response) => {
        this.setState({
          users: response.data.data,
          triggerLoading: false
        });
      })
      .catch(error => console.log(error.response));
  }

  render() {
    return (
      <Fragment>
        {this.state.triggerLoading && <Loader />}
        {this.state.triggerLoading === false && this.state.users.length !== 0 && <Table users={this.state.users}/>}
        {this.state.triggerLoading === false && this.state.users.length === 0 && "No result."}
      </Fragment>
    );
  }

  componentDidMount() {
    this.fetchUsers();
  }
}

export default Users;