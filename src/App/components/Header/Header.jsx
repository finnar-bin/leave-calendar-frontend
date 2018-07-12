import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import HeaderForm from '../../containers/HeaderForm';
import HeaderGreeting from './HeaderGreeting';
import banner from '../../assets/img/banner.png';

let styles = {
  navbar__brand: {
    height: '100px'
  }
}

const showGreeting = () => {
  if (window.location.href.indexOf('admin') > -1 || window.location.href.indexOf('search') > -1) {
    return false;
  } else {
    return true;
  }
}

const Header = () => (
  <nav className="navbar navbar-light">
    <NavLink exact to="/calendar" className="navbar-brand">
      <img src={banner} alt="header-banner" style={styles.navbar__brand} data-tip data-for="headerLogo"/>
      <ReactTooltip delayShow={1000} id="headerLogo">
        <span>Home</span>
      </ReactTooltip>
    </NavLink>
    {showGreeting() && <HeaderGreeting/>}
    <HeaderForm />
  </nav>
);

Header.propTypes = {
  credits: PropTypes.number
}

export default Header;