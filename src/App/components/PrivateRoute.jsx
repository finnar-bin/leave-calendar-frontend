import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { authenticate } from '../utils/auth';

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    authenticate() ? <Component {...props} /> : <Redirect to='/admin/signin' /> 
  )} />
)

PrivateRoute.propTypes = {
  component: PropTypes.func
}

export default PrivateRoute;