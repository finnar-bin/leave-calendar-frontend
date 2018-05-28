import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import UserRoute from './components/UserRoute';
import Header from './components/Header';
import AdminNav from './components/AdminNav';

import SelectUser from './pages/SelectUser';
import Calendar from './pages/Calendar';
import Search from './pages/Search';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import New from './pages/Admin/New';
import Users from './pages/Admin/Users';

let styles = {};

styles.body__wrapper = {
  padding: '2%'
};

export const BaseRouter = () => (
  <Router>
    <Route exact path="/" component={SelectUser} />
  </Router>
);

export const MainRouter = () => (
  <Router>
    <Fragment>
      <div className="nav__wrapper">
        <Header />
      </div>
      <div style={styles.body__wrapper}>
        <Switch>
          <UserRoute exact path="/calendar" component={Calendar} />
          <UserRoute exact path="/search/:name" component={Search} />
          <UserRoute exact path="/admin/signin" component={AdminLogin} />
          <PrivateRoute path="/admin" component={Admin} />
        </Switch>
      </div>
    </Fragment>
  </Router>
);

export const AdminRouter = (props) => (
  <div className="container">
    <Router>
      <Fragment>
        <AdminNav {...props}/>
        <div className="my-3">
          <Switch>
            <Route exact path="/admin/users" component={Users} />
            <Route exact path="/admin/new" component={New} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  </div>
);