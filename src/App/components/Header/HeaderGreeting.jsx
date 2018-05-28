import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { changeUser } from '../../utils/user';

let greetings = [
  'Hey there',
  'Howdy',
  'What\'s up',
  'Hi',
  'Top of the morning'
]

let randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

let username = localStorage.getItem('name') || 'name_placeholder';

let styles = {}

styles.greeting__text = {
  color: '#D7CEC7'
}

styles.greeting__link = {
  fontSize: '0.8em',
  cursor: 'pointer',
  textDecoration: 'underline'
}

class HeaderGreeting extends Component {
  state = {
    triggerRedirect: false
  }

  handleChangeUser = () => {
    changeUser();
    this.setState({ triggerRedirect: true });
  }

  render () {
    return(
      <Fragment>
        <span className="text-center mx-3" style={styles.greeting__text}>
          <span>{randomGreeting}, <strong>{username}</strong>!</span>
          <br/>
          <a style={styles.greeting__link} onClick={() => this.handleChangeUser()}>Not $name_here?</a>
        </span>

        {this.state.triggerRedirect && <Redirect to='/' />}
      </Fragment>
    );
  }
}

HeaderGreeting.propTypes = {
  history: PropTypes.obj
}

export default HeaderGreeting;