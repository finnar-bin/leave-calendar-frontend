import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const CustomEvent = ({event}) => {
  if (event.status === 'Holiday') {
    return (
      <span className="text-center">
        <strong>{event.name} </strong>
      </span>
    );
  }
  return (
    <span className="text-center">
      <strong>{event.name} </strong>
      <em style={{fontSize: '.8em'}}> {`${moment(event.start).format('h:mm A')} - ${moment(event.end).format('h:mm A')}`}</em>
    </span>
  );
};

CustomEvent.propTypes = {
  event: PropTypes.object
}

export default CustomEvent;