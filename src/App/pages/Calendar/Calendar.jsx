import React, { Fragment, Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

let styles = {}

styles.calendarWrapper = {
  minHeight: '100vh'
}

class Calendar extends Component {
  state = {
    events: [
      {
        id: 0,
        name: 'Mike Litoris',
        type: 'Whole Day',
        start: new Date(2018, 4, 15, 0),
        end: new Date(2018, 4, 17, 24),
      }
    ],
    triggerModal: false
  }

  EventCalendar = ({ event }) => (
    <span>
      <strong>{event.name}</strong>
      :
      <em> {event.type}</em>
    </span>
  )

  render() {
    return (
        <Fragment>
          <BigCalendar
            style={styles.calendarWrapper}
            events={this.state.events}
            defaultDate={new Date()}
            selectable={true}
            onSelectSlot={(slotInfo) => alert(slotInfo.end)}
            views={['month']}
            components={{
              event: this.EventCalendar
            }}
          />
        </Fragment>
    );
  }
}

export default Calendar;