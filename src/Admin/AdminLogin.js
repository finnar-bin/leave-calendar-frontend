import React from 'react';

import LoginForm from './components/LoginForm';

const Admin = (props) => {
  return (
    <div className="text-center col-4 offset-4 my-5">
      <h1>Log in to continue...</h1>
      <hr/>
      <LoginForm {...props}/>
    </div>
  );
};

export default Admin;