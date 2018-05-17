import React from 'react';
import { NavLink } from 'react-router-dom';

import NavForm from './components/NavForm';
import NavUrl from './components/NavUrl';

let styles = {}
styles.navbar__brand = {
  fontSize: '2em',
  fontWeight: 'bold',
  color: '#D7CEC7'
};

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light">
    <NavLink exact to="/" className="navbar-brand" style={styles.navbar__brand}>Leave Management Portal</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <NavUrl />
      <NavForm />
    </div>
  </nav>
);

export default Navbar;