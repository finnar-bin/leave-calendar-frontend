import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

let styles = {
  badge: {
    display: 'inline-block',
    padding: '.25em .4em',
    lineHeight: '1',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '.25rem',
    color: '#fff',
    backgroundColor: '#f8f9fa38',
  }
}

const splitString = (string) => {
  let split = string.split(" ");
  return split[0];
}

const CustomEvent = ({event}) => {
  if (event.status === 'Holiday') {
    return (
      <div className="text-center">
        <strong>{event.name}</strong>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-md-auto p-0">
          <strong>{splitString(event.name)}</strong>
        </div>
        <div className="col-md-auto p-0">
          <em style={{fontSize: '.8em'}}> {`${moment(event.start).format('h:mm A')} - ${moment(event.end).format('h:mm A')}`}</em>
        </div>
        <div className="col-md-auto p-0">
          <span style={styles.badge}>
            <FontAwesomeIcon icon={event.status === 'Approved' ? "check-circle" : "hourglass-half"} />
          </span>
        </div>
      </div>
    </div>
  );
};

CustomEvent.propTypes = {
  event: PropTypes.object
}

export default CustomEvent;