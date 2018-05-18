import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import Users from './components/Users';
import New from './components/New';

const Admin = () => {
  return (
    <div className="container">
      <Router>
        <Fragment>
          <AdminNavbar />
          <Switch>
            <Route path="/users" component={Users} />
            <Route path="/new" component={New}/>
          </Switch>
        </Fragment>

      </Router>
    </div>
  );
};

export default Admin;