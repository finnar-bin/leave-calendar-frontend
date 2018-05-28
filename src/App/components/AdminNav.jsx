import React from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';

import { signout } from '../utils/auth';
import Button from '../components/Button';

let styles = {}

styles.button__logout = {
  cursor: 'pointer',
  color: '#fff',
  marginLeft: '73%'
}

styles.button__navItem = {
  color: '#495057',
}

const AdminNav = (props) => {
  const onLogout = () => {
    signout();
    props.history.push('/admin/signin');
  }

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink style={styles.button__navItem} className="nav-link" activeClassName="active" to="/admin/users">All Users</NavLink>
      </li>
      <li className="nav-item">
        <NavLink style={styles.button__navItem} className="nav-link" activeClassName="active" to="/admin/new">Add New</NavLink>
      </li>
      <li className="nav-item" style={styles.button__logout}>
        <Button 
          text="Log Out"
          kind="danger"
          clickAction={() => onLogout()}
          size="small"
          otherClasses="mx-1 nav-link"
        />
      </li>
    </ul>
  );
}

AdminNav.propTypes = {
  history: propTypes.object
}

export default AdminNav;