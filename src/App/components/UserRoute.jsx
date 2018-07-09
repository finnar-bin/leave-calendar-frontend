import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { isUser } from '../utils/user';

const UserRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    isUser() ? <Component {...props} {...rest} /> : <Redirect to='/' />
  )} />
);

UserRoute.propTypes = {
  component: PropTypes.func
}

export default UserRoute;