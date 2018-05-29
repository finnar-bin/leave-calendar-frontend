import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import HeaderWrapper from '../../components/Header';
import CalendarAdd from '../../containers/Calendar/CalendarAdd';
import CalendarRemove from '../../containers/Calendar/CalendarRemove';
import Alert from '../../components/Alert';

moment().utcOffset(12);
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
        start: new Date('5/15/2018'),
        end: new Date('5/16/2018 12:00'),
      }
    ],
    triggerAlertSuccess: false,
    triggerAlertError: false,
    triggerAddModal: false,
    triggerRemoveModal: false,
    selectedDateFrom: '',
    selectedDateTo: ''
  }

  EventCalendar = ({ event }) => (
    <span>
      <strong>{event.name}</strong>
      :
      <em> {event.type}</em>
    </span>
  );

  handleModalClose = () => {
    this.setState({
      triggerAddModal: false,
      triggerRemoveModal: false
    });
  }

  handleAlertClose = () => {
    this.setState({
      triggerAlertError: false,
      triggerAlertSuccess: false
    });
  }

  setSuccess = () => {
    this.setState({
      triggerAlertSuccess: true
    });
  }

  setError = () => {
    this.setState({
      triggerAlertError: true
    });
  }

  render() {
    return (
      <HeaderWrapper>
        <BigCalendar
          style={styles.calendarWrapper}
          events={this.state.events}
          defaultDate={new Date(moment())}
          selectable={true}
          onSelectSlot={slotInfo =>
            this.setState({
              selectedDateFrom: slotInfo.start.toLocaleDateString(),
              selectedDateTo: slotInfo.end.toLocaleDateString(),
              triggerAddModal: true
            })
          }
          views={['month']}
          components={{
            event: this.EventCalendar
          }}
          
        />
        {this.state.triggerAddModal && <CalendarAdd closeModal={this.handleModalClose} from={this.state.selectedDateFrom} to={this.state.selectedDateTo} onSuccess={this.setSuccess} onError={this.setError} />}
        {this.state.triggerRemoveModal && <CalendarRemove closeModal={this.handleModalClose} />}
        {this.state.triggerAlertSuccess && <Alert floating={true} kind="success" message="Leave successfully added" clickAction={this.handleAlertClose} />}
        {this.state.triggerAlertError && <Alert floating={true} kind="danger" message="Failed to add the leave" clickAction={this.handleAlertClose} />}
      </HeaderWrapper>
    );
  }
}

export default Calendar;