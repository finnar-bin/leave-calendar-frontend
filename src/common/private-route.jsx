import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';

import { authenticate } from '../__utils/auth';

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    authenticate() === true
    ? <Component {...props} />
    : <Redirect to='/admin/signin' /> 
  )} />
)

PrivateRoute.propTypes = {
  component: propTypes.func
}

export default PrivateRoute;