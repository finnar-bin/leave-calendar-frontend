import React from 'react';
import { NavLink } from 'react-router-dom';

let styles ={};

styles.navbar__url = {
  color: '#D7CEC7'
};

const HeaderNav = () => {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink exact to="/calendar" activeStyle={{ borderBottom: '5px solid #D7CEC7' }} className="nav-link" style={styles.navbar__url}>Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/admin/users" activeStyle={{ borderBottom: '5px solid #D7CEC7' }} className="nav-link" style={styles.navbar__url}>Admin Panel</NavLink>
      </li>
    </ul>
  );
};

export default HeaderNav;