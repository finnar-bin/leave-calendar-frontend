import React from 'react';
import { MainRouter } from './Router';


let styles = {
  main__wrapper: {
    boxShadow: '15px 15px 35px black',
    border: 0
  }
}

const App = () => (
  <div className="card" style={styles.main__wrapper}>
    <MainRouter />
  </div>
);

export default App;