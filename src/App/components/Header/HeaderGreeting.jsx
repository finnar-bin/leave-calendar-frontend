import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { changeUser } from 'utils/user';
import UIContext from 'containers/UI/UIContext';

let greetings = [
  'Hey there',
  'Howdy',
  'What\'s up',
  'Hi',
  'Top of the morning'
]

let randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

let styles = {
  greeting__text: {
    color: '#D7CEC7'
  },
  greeting__link: {
    fontSize: '0.8em',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
}

const UserInfo = () => (
  <UIContext.Consumer>
    {val => (
      <Fragment>
        <span>{randomGreeting}, <strong>{val.fullName}</strong>!</span>
        <span>You have {val.leaveCredits} leaves remaining.</span>
      </Fragment>
    )}
  </UIContext.Consumer>
)

class HeaderGreeting extends Component {
  state = {
    triggerRedirect: false,
  }

  handleChangeUser = () => {
    changeUser();
    this.setState({ triggerRedirect: true });
  }

  render () {
    return(
      <Fragment>
        <span className="navbar-nav text-center mx-3" style={styles.greeting__text}>
          <UserInfo />
          <a style={styles.greeting__link} onClick={() => this.handleChangeUser()}>Change User</a>
        </span>
        {this.state.triggerRedirect && <Redirect to='/' />}
      </Fragment>
    );
  }
}

HeaderGreeting.propTypes = {
  history: PropTypes.func
}

export default HeaderGreeting;