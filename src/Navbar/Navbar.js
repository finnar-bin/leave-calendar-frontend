import React from 'react'
import { NavLink } from 'react-router-dom'

import NavForm from './components/NavForm'

let styles = {}
styles.navbar__brand = {
  fontSize: '2em',
  fontWeight: 'bold',
  color: '#D7CEC7'
}

const Navbar = () => (
  <nav className="navbar navbar-light">
    <NavLink exact to="/" className="navbar-brand" style={styles.navbar__brand}>Leave Management Portal</NavLink>
    <NavForm />
  </nav>
)

export default Navbar;