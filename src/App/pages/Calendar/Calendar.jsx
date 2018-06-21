import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import _ from 'lodash';
import PropTypes from 'prop-types';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import HeaderWrapper from 'components/Header';
import CalendarAdd from 'containers/Calendar/CalendarAdd';
import CalendarEvent from 'containers/Calendar/CalendarEvent';
import Alert from 'components/Alert';
import Loader from 'components/Loader';
import CustomToolbar from 'components/Calendar/CustomToolbar';
import CustomEvent from 'components/Calendar/CustomEvent';
import CustomEventPropGetter from 'components/Calendar/CustomEventPropGetter';
import CustomDayPropGetter from 'components/Calendar/CustomDayPropGetter';
import { getLeaves, getHolidays } from 'api';
import { isAfterToday } from 'utils/checkDays';

BigCalendar.momentLocalizer(moment);

let styles = {
  calendarWrapper: {
    minHeight: '100vh'
  }
}

class Calendar extends Component {
  state = {
    events: [],
    isLoading: true,
    triggerAlertSuccess: false,
    triggerAlertError: false,
    triggerAddModal: false,
    triggerEventModal: false,
    selectedDateFrom: '',
    selectedDateTo: '',
    messageError: '',
    messageSuccess: '',
    toDisplayEvent: {},
  }

  /************* ACTIONS START **************/
  fetchEvents = async () => {
    let leaves = await getLeaves();
    let holidays = await getHolidays();

    if (leaves.error) {
      console.error(leaves.error.data.message);
    } else if (holidays.error) {
      console.error(holidays.error.data.error);
    } else {
      let tempArray = [];
      leaves.data.data.map((leave) => {
        let arr = {
          id: leave._id,
          name: leave.userId.fullName,
          start: new Date(leave.start),
          end: new Date(leave.end),
          status: leave.status,
          type: leave.type
        }
        return tempArray.push(arr);
      });

      holidays.data.items.map((holiday) => {
        let arr = {
          id: holiday.id,
          name: holiday.summary,
          start: new Date(`${holiday.start.date} 12:00 AM`),
          end: new Date(`${holiday.end.date} 12:00 AM`),
          status: 'Holiday'
        }
        return tempArray.push(arr);
      });

      this.setState({
        events: tempArray,
        isLoading: false
      });
    }
  }

  handleModalClose = () => {
    this.setState({
      triggerAddModal: false,
      triggerEventModal: false
    });
  }

  handleAlertClose = () => {
    this.setState({
      triggerAlertError: false,
      triggerAlertSuccess: false
    });
  }

  setSuccess = (message) => {
    this.setState({
      triggerAlertSuccess: true,
      messageSuccess: message,
    });
    this.props.updateUserInfo();
    this.fetchEvents();
  }

  setError = (message) => {
    this.setState({
      triggerAlertError: true,
      messageError: message
    });
  }

  displayLeaveInfo = (eventId) => {
    // eslint-disable-next-line
    this.state.events.map((event) => {
      if (eventId === event.id) {
        this.setState({
          toDisplayEvent: event
        })
      }
    });
  }
  /************* ACTIONS END **************/

  render() {
    return (
      <HeaderWrapper>
        {
          !this.state.isLoading
          &&
          <BigCalendar
            defaultDate={new Date()}
            style={styles.calendarWrapper}
            events={this.state.events}
            selectable={true}
            popup={true}
            onSelectSlot={slotInfo => {
              if (isAfterToday(slotInfo.start)) {
                this.setState({
                  selectedDateFrom: slotInfo.start.toLocaleDateString(),
                  selectedDateTo: slotInfo.end.toLocaleDateString(),
                  triggerAddModal: true
                });
              } else {
                this.setError('You can\'t file a leave on past dates');
              }
            }}
            onSelectEvent={event => {
              if (event.status !== 'Holiday') {
                this.displayLeaveInfo(event.id);
                this.setState({ triggerEventModal: true })
              }
            }}
            views={['month']}
            components={{
              event: CustomEvent,
              toolbar: CustomToolbar
            }}
            eventPropGetter={CustomEventPropGetter}
            dayPropGetter={CustomDayPropGetter}
          />
        }
        {this.state.isLoading && <Loader />}
        {this.state.triggerEventModal && <CalendarEvent event={this.state.toDisplayEvent} closeModal={this.handleModalClose} onSuccess={this.setSuccess} onError={this.setError} />}
        {this.state.triggerAddModal && <CalendarAdd closeModal={this.handleModalClose} from={this.state.selectedDateFrom} to={this.state.selectedDateTo} onSuccess={this.setSuccess} onError={this.setError} />}
        {this.state.triggerAlertSuccess && <Alert floating={true} kind="success" message={this.state.messageSuccess} clickAction={this.handleAlertClose} />}
        {this.state.triggerAlertError && <Alert floating={true} kind="danger" message={this.state.messageError} clickAction={this.handleAlertClose} />}
      </HeaderWrapper>
    );
  }

  componentDidMount() {
    this.fetchEvents();
  }
}

Calendar.propTypes = {
  updateUserInfo: PropTypes.func
}

export default Calendar;