import React, { Fragment } from 'react';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Button from 'components/Button';

let styles = {
  box__approved: {
    border: '1px solid #ddd',
    height: '15px',
    width: '15px',
    borderRadius: '25%',
    backgroundColor: '#015249',
    display: 'inline-block'
  },
  box__pending: {
    border: '1px solid #ddd',
    height: '15px',
    width: '15px',
    borderRadius: '25%',
    backgroundColor: '#984B43',
    display: 'inline-block'
  },
  calendar__label: {
    fontSize: '2.15rem',
    fontWeight: '340',
    lineHeight: '1.2'
  }
}

const CustomToolbar = (toolbar) => {
  const label = () => {
    const date = moment(toolbar.date);
    return (
      <Fragment>{date.format('MMMM')} {date.format('YYYY')}</Fragment>
    );
  }

  return (
    <div className="mb-3 d-flex justify-content-between">
      <div className="btn-group">
        <Button
          text={<FontAwesomeIcon icon="chevron-left"/>}
          kind="dark"
          outline
          clickAction={()=> toolbar.onNavigate('PREV')}
          size="large"
        />
        <Button
          text={<FontAwesomeIcon icon="calendar-check"/>}
          kind="dark"
          outline
          clickAction={()=> toolbar.onNavigate('TODAY')}
          size="large"
        />
        <Button
          text={<FontAwesomeIcon icon="chevron-right"/>}
          kind="dark"
          outline
          clickAction={()=> toolbar.onNavigate('NEXT')}
          size="large"
        />
      </div>
      <h2 className="my-1" style={styles.calendar__label}>{label()}</h2>

      <div>
        <div style={styles.box__approved}></div> <span className="text-muted">Approved</span>
        <br/>
        <div style={styles.box__pending}></div> <span className="text-muted">Pending</span>
      </div>
    </div>
  );
};

export default CustomToolbar;