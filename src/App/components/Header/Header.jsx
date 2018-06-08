import React from 'react';
import { NavLink } from 'react-router-dom';

import HeaderNav from './HeaderNav';
import HeaderForm from 'containers/HeaderForm';
import HeaderGreeting from './HeaderGreeting';
import banner from 'assets/img/banner.png';

let styles = {
  navbar__brand: {
    height: '100px'
  }
}

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light">
    <NavLink exact to="/calendar" className="navbar-brand"><img src={banner} alt="header-banner" style={styles.navbar__brand}/></NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <HeaderNav />
      <HeaderGreeting />
      <HeaderForm />
    </div>
  </nav>
);

export default Header;