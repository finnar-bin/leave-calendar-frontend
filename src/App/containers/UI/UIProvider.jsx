import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UIContext from './UIContext';
import { getUser } from '../../api';

class UIProvider extends Component {
  fetchUser = async () => {
    let user = await getUser(localStorage.getItem('userId'));
    if (user.error) {
      console.log(user.error.message);
    } else {
      this.setState({
        fullName: user.data.data.fullName,
        leaveCredits: parseFloat(user.data.data.leaveCredits).toPrecision(3)
      });
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