import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import Paper from "@material-ui/core/Paper";

import { fetchHolidays } from "../../store/actions/calendarAction";

// Big Calendar Date Localizer setup
const localizer = BigCalendar.momentLocalizer(moment);

class CalendarArea extends Component {
  componentDidMount() {
    this.props.fetchHolidays();
  }

  render() {
    return (
      <Paper>
        {/* <BigCalendar
          localizer={localizer}
          defaultDate={new Date()}
          views={["month"]}
        /> */}
        <h1>Hello</h1>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  error: state.events.error
});

const mapDispatchToProps = dispatch => ({
  fetchHolidays: () => dispatch(fetchHolidays())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarArea);
