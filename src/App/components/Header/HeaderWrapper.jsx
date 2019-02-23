import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

let styles = {
  body__wrapper: {
    padding: '2%'
  }
}

const HeaderWrapper = ({ children }) => {
  return (
    <Fragment>
      <div className="nav__wrapper">
        <Header/>
      </div>
      <div style={styles.body__wrapper}>
        {children}
      </div>
    </Fragment>
  );
};

HeaderWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  credits: PropTypes.number
}

export default HeaderWrapper;