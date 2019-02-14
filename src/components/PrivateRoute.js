import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAdmin } from "../utils/authentication";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAdmin() ? <Component {...props} /> : <Redirect to="/admin/login" />
    }
  />
);

export default PrivateRoute;
