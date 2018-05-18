import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AdminNavbar from './components/AdminNavbar';
import Users from './components/Users';
import New from './components/New';
import AdminLogin from './AdminLogin';

const Admin = (props) => {
  return (
    <div className="container">
      <Router>
        <Fragment>
          <AdminNavbar {...props}/>
          <Switch>
            <Route path="/users" component={Users} />
            <Route path="/new" component={New} />
            <Route path="/admin/signin" component={AdminLogin} />
          </Switch>
        </Fragment>

      </Router>
    </div>
  );
};

export default Admin;