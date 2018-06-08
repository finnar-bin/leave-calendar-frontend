import React from 'react';

let styles = {
  loader__body: {
    margin: '0 45%'
  }
}

const Loader = () => {
  return (
    <div className="text-center mt-5">
      <div className="lds-grid" style={styles.loader__body}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span style={styles.loader__body}>Loading...</span>
    </div>
  );
};

export default Loader;