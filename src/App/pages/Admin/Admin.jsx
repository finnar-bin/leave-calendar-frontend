import React from 'react';

import { AdminRouter } from '../../Router';
import HeaderWrapper from '../../components/Header';

const Admin = (props) => (
  <HeaderWrapper>
    <AdminRouter {...props}/>
  </HeaderWrapper>
);

export default Admin;