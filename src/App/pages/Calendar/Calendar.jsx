import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import HeaderWrapper from '../../components/Header';
import CalendarAdd from '../../containers/Calendar/CalendarAdd';
import CalendarRemove from '../../containers/Calendar/CalendarRemove';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import { getLeaves } from '../../api';

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
    triggerRemoveModal: false,
    selectedDateFrom: '',
    selectedDateTo: '',
    toDisplayEvent: {},
  }

  EventCalendar = ({ event }) => (
    <span>
      <strong>{event.name}</strong>
      :
      <em> {event.type}</em>
    </span>
  );

  fetchLeaves = async () => {
    let leaves = await getLeaves();
    console.log(leaves);
    if (leaves.error) {
      console.log(leaves.error.data.message);
    } else {
      let tempArray = [];
      // eslint-disable-next-line
      leaves.data.data.map((data) => {
        let arr = {
          id: data._id,
          name: data.userId.fullName,
          type: data.type,
          start: new Date(data.start),
          end: new Date(data.end)
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
      triggerRemoveModal: false
    });
  }

  handleAlertClose = () => {
    this.setState({
      triggerAlertError: false,
      triggerAlertSuccess: false
    });
  }

  setSuccess = (newLeaveArray) => {
    this.setState({
      triggerAlertSuccess: true,
      events: [...this.state.events, newLeaveArray]
    });
  }

  setError = () => {
    this.setState({
      triggerAlertError: true
    });
  }

  displayLeaveInfo = (eventId) => {
    // eslint-disable-next-line
    this.state.events.map((event) => {
      if (eventId === event.id) {
        return event;
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
            onSelectSlot={slotInfo =>
              this.setState({
                selectedDateFrom: slotInfo.start.toLocaleDateString(),
                selectedDateTo: slotInfo.end.toLocaleDateString(),
                triggerAddModal: true
              })
            }
            onSelectEvent={event => {
              this.displayLeaveInfo(event.id);
            }}
            views={['month']}
            components={{
              event: this.EventCalendar
            }} 
          />
        }
        {this.state.isLoading && <Loader />}
        {this.state.triggerAddModal && <CalendarAdd closeModal={this.handleModalClose} from={this.state.selectedDateFrom} to={this.state.selectedDateTo} onSuccess={this.setSuccess} onError={this.setError} />}
        {this.state.triggerRemoveModal && <CalendarRemove closeModal={this.handleModalClose} />}
        {this.state.triggerAlertSuccess && <Alert floating={true} kind="success" message="Leave successfully added" clickAction={this.handleAlertClose} />}
        {this.state.triggerAlertError && <Alert floating={true} kind="danger" message="Failed to add the leave" clickAction={this.handleAlertClose} />}
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