import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getUsers } from '../../api';
import Button from '../../components/Button';

let styles = {}

styles.select__wrapper = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

class SelectUser extends Component {
  state = {
    users: [],
    selectedName: '',
    selectedId: 'default'
  }

  fetchUsers = async () => {
    let users = await getUsers();
    if (users.error) {
      console.error(users.error.data.message);
    } else {
      this.setState({
        users: users.data.data
      });
    }
  }

  setSelect = (e) => {
    this.setState({
      selectedName: e.target.options[e.target.selectedIndex].text,
      selectedId: e.target.value
    });
  }

  handleSelect = () => {
    localStorage.setItem('name', this.state.selectedName);
    localStorage.setItem('userId', this.state.selectedId);
    this.props.history.push('/calendar');
  }

  render() {
    let userDropdown = this.state.users.map((data) => {
      return (
        <option
          key={data._id}
          value={data._id}
        >
          {data.fullName}
        </option>
      );
    });

    return (
      <div className="text-center" style={styles.select__wrapper}>
        <h1>Find your name below</h1>
        <hr/>
        <select className="form-control form-control-lg mb-3" value={this.state.selectedId} onChange={this.setSelect} >
          <option disabled value="default">Choose here...</option>
          {userDropdown}
        </select>
        <Button
          text="Proceed"
          kind="primary"
          size="large"
          outline={true}
          clickAction={this.handleSelect}
        />
      </div>
    );
  }

  componentDidMount() {
    this.fetchUsers();
  }
}

SelectUser.propTypes = {
  history: PropTypes.object
}

export default SelectUser;