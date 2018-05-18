import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavbar = (props) => {
  

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/users">All Users</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/new">Add New</NavLink>
      </li>
      
    </ul>
  );
}



export default AdminNavbar;