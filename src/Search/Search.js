import React from 'react'
import propTypes from 'prop-types'

const Search = ({ match }) => {
  return (
    <div>
      <h1>Search user area</h1>
      <p>Name: {match.params.name}</p>
    </div>
  );
};

Search.propTypes = {
  match: propTypes.object
}

export default Search;