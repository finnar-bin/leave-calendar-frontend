import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UIContext from './UIContext';
import { getUser } from 'api';

class UIProvider extends Component {
  fetchUser = async () => {
    let user = await getUser(localStorage.getItem('userId'));
    if (user.error) {
      console.log(user.error.data.message);
    } else {
      this.setState({
        fullName: user.data.data.fullName,
        leaveCredits: user.data.data.leaveCredits
      })
    }
  }
  
  state = {
    leaveCredits: 0,
    fullName: 'placeholder',
    updateUserInfo: this.fetchUser
  }
  
  render() {
    return (
      <UIContext.Provider value={this.state}>
        {this.props.children}
      </UIContext.Provider>
    );
  }

  componentDidMount() {
    this.fetchUser();
  }
}

UIProvider.propTypes = {
  children: PropTypes.element
}

export default UIProvider;