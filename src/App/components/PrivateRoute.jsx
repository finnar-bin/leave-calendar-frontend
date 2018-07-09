import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { authenticate } from '../utils/auth';
import { isUser } from '../utils/user';

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    authenticate() && isUser() ? <Component {...props} /> : <Redirect to='/admin/signin' /> 
  )} />
)

PrivateRoute.propTypes = {
  component: PropTypes.func
}

export default PrivateRoute;