import React from 'react';

import AdminLoginForm from 'containers/AdminLoginForm';
import HeaderWrapper from 'components/Header';

const AdminLogin = (props) => {
  return (
    <HeaderWrapper>
      <div className="text-center col-4 offset-4 my-5">
        <h1>Log in to continue...</h1>
        <hr/>
        <AdminLoginForm {...props}/>
      </div>
    </HeaderWrapper>
  );
};

export default AdminLogin;