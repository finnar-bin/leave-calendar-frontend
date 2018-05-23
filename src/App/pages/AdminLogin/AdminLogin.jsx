import React from 'react';

import AdminLoginForm from '../../containers/AdminLoginForm';

const AdminLogin = (props) => {
  return (
    <div className="text-center col-4 offset-4 my-5">
      <h1>Log in to continue...</h1>
      <hr/>
      <AdminLoginForm {...props}/>
    </div>
  );
};

export default AdminLogin;