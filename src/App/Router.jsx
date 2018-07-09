import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import UserRoute from './components/UserRoute';
import AdminNav from './components/AdminNav';
import SelectUser from './pages/SelectUser';
import Calendar from './pages/Calendar';
import Search from './pages/Search';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import New from './pages/Admin/New';
import Users from './pages/Admin/Users';
import Error503 from './pages/Error';
import UIProvider from './containers/UI/UIProvider';
import UIContext from './containers/UI/UIContext';

export const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={SelectUser} />
      <Route path="/error/503" component={Error503} />
      <UserRoute path="/search/:name" component={Search} />
      <UserRoute path="/admin/signin" component={AdminLogin} />
      <PrivateRoute path="/admin" component={Admin} />   
      <UIProvider>
        <UIContext.Consumer>
          {val => (
            <UserRoute path="/calendar" component={Calendar} update={val.updateUserInfo} />
          )}
        </UIContext.Consumer>
      </UIProvider>
    </Switch>
  </Router>
)

export const AdminRouter = (props) => (
  <div className="container">
    <Router>
      <Fragment>
        <AdminNav {...props}/>
        <div className="my-3">
          <Switch>
            <Route path="/admin/users" component={Users} />
            <Route path="/admin/new" component={New} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  </div>
);