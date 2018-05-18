import React from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';

import { authenticate } from '../../__utils/Authenticate';

let styles = {}

styles.button__logout = {
  cursor: 'pointer',
}

const AdminNavbar = (props) => {
  const onLogout = () => {
    authenticate.signout();
    props.history.push('/admin/signin');
  }

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/users">All Users</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/new">Add New</NavLink>
      </li>
      <li className="nav-item" style={styles.button__logout}>
        <a onClick={() => onLogout()} className="nav-link btn btn-primary btn-sm mx-1">Logout</a>
      </li>
    </ul>
  );
}

AdminNavbar.propTypes = {
  history: propTypes.object
}

export default AdminNavbar;