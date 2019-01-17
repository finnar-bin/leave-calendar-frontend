import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchHolidays } from "../../store/actions/calendarAction";

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
          events={this.props.events}
        />
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
)(withStyles(styles)(CalendarArea));
