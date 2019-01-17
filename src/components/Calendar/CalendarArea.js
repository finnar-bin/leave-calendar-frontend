import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchHolidays, fetchLeaves } from "../../store/actions/calendarAction";

// Big Calendar Date Localizer setup
const localizer = BigCalendar.momentLocalizer(moment);

const styles = theme => ({
  root: {
    minHeight: "80vh",
    padding: theme.spacing.unit
  },
  calendar: {
    height: "80vh"
  }
});

class CalendarArea extends Component {
  componentDidMount() {
    this.props.fetchHolidays();
    this.props.fetchLeaves();
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <BigCalendar
          className={classes.calendar}
          localizer={localizer}
          defaultDate={new Date()}
          views={["month"]}
          events={[...this.props.holidays.dates, ...this.props.leaves.dates]}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  holidays: state.events.holidays,
  leaves: state.events.leaves
});

const mapDispatchToProps = dispatch => ({
  fetchHolidays: () => dispatch(fetchHolidays()),
  fetchLeaves: () => dispatch(fetchLeaves())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CalendarArea));
