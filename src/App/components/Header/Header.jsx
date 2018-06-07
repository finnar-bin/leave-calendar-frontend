import React from 'react';
import { NavLink } from 'react-router-dom';

import HeaderNav from './HeaderNav';
import HeaderForm from '../../containers/HeaderForm';
import HeaderGreeting from './HeaderGreeting';

let styles = {}
styles.navbar__brand = {
  fontSize: '2em',
  fontWeight: 'bold',
  color: '#D7CEC7'
};

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light">
    <NavLink exact to="/calendar" className="navbar-brand" style={styles.navbar__brand}>Leave Management Portal</NavLink>
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