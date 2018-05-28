import React from 'react';
import { MainRouter, BaseRouter } from './Router';
import { isUser } from './utils/user';


let styles = {};

styles.main__wrapper = {
  boxShadow: '15px 15px 35px black',
  border: 0
};

const App = () => (
  <div className="card" style={styles.main__wrapper}>
    <BaseRouter />
  </div>
);

export default App;