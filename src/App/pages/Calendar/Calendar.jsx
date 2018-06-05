import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import _ from 'lodash';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import HeaderWrapper from '../../components/Header';
import CalendarAdd from '../../containers/Calendar/CalendarAdd';
import CalendarEvent from '../../containers/Calendar/CalendarEvent';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import { getLeaves } from '../../api';
import { isAfterToday } from '../../utils/checkDays';

moment().utcOffset(12);
BigCalendar.momentLocalizer(moment);

let styles = {}

styles.calendarWrapper = {
  minHeight: '100vh'
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

  EventCalendar = ({ event }) => (
    <span className="text-center">
      <strong>{event.name} </strong>
      |
      <em style={{ fontSize: '.7em'}}> {`${event.start.toLocaleTimeString()} - ${event.end.toLocaleTimeString()}`}</em>
    </span>
  );

  fetchLeaves = async () => {
    let leaves = await getLeaves();
    // console.log(leaves);
    if (leaves.error) {
      console.log(leaves.error.data.message);
    } else {
      let tempArray = [];
      // eslint-disable-next-line
      leaves.data.data.map((data) => {
        let arr = {
          id: data._id,
          name: data.userId.fullName,
          start: new Date(data.start),
          end: new Date(data.end),
          status: data.status
        }
        tempArray.push(arr);
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

  setSuccess = (message, newLeaveArray, type) => {
    let newArray = [];
    if (type === 'add') {
      newArray = [...this.state.events, newLeaveArray]
    } else {
      newArray = _.pull(this.state.events, newLeaveArray)
    }
    this.setState({
      triggerAlertSuccess: true,
      events: newArray,
      messageSuccess: message
    });
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

  render() {
    return (
      <HeaderWrapper>
        {!this.state.isLoading &&
          <BigCalendar
            style={styles.calendarWrapper}
            events={this.state.events}
            defaultDate={new Date(moment())}
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
              this.displayLeaveInfo(event.id);
              this.setState({ triggerEventModal: true })
            }}
            views={['month']}
            components={{
              event: this.EventCalendar
            }} 
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
    this.fetchLeaves();
  }

  shouldComponentUpdate(nextState) {
    const diffState = this.state.events !== nextState.events;
    return diffState;
  }
}

export default Calendar;