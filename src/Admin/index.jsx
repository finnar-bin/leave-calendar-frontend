import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MiniNav from './components/mininav';
import Users from './containers/users';
import New from './components/new';

const Admin = (props) => {
  return (
    <div className="container">
      <Router>
        <Fragment>
          <MiniNav {...props}/>
          <div className="my-3">
            <Switch>
              <Route path="/users" component={Users} />
              <Route path="/new" component={New} />
            </Switch>
          </div>
        </Fragment>

      </Router>
    </div>
  );
};

export default Admin;