import React from 'react';
import PropTypes from 'prop-types';

import HeaderWrapper from '../../components/Header';

const Search = ({ match }) => {
  return (
    <HeaderWrapper>
      <h1>Search user area</h1>
      <p>Name: {match.params.name}</p>
    </HeaderWrapper>
  );
};

Search.propTypes = {
  match: PropTypes.object
}

export default Search;