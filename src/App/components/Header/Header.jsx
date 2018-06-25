import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import HeaderForm from 'containers/HeaderForm';
import HeaderGreeting from './HeaderGreeting';
import banner from 'assets/img/banner.png';

let styles = {
  navbar__brand: {
    height: '100px'
  }
}

const isAdmin = () => {
  if (window.location.href.indexOf('admin') > -1) {
    return true;
  } else {
    return false;
  }
}

const Header = () => (
  <nav className="navbar navbar-light">
    <NavLink exact to="/calendar" className="navbar-brand"><img src={banner} alt="header-banner" style={styles.navbar__brand}/></NavLink>
    {!isAdmin() && <HeaderGreeting/>}
    <HeaderForm />
  </nav>
);

Header.propTypes = {
  credits: PropTypes.number
}

export default Header;