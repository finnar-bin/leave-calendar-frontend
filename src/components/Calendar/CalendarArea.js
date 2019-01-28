import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import "react-big-calendar/lib/css/react-big-calendar.css";
import LeaveRequest from "./LeaveRequest";
import { fetchLeaves } from "../../store/actions/leavesAction";
import { fetchHolidays } from "../../store/actions/holidaysAction";
import Toolbar from "../Calendar/CustomTemplates/Toolbar";
import EventPropGetter from "../Calendar/CustomTemplates/EventPropGetter";

// Big Calendar Date Localizer setup
const localizer = BigCalendar.momentLocalizer(moment);
const components = {
  toolbar: Toolbar
};

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
  state = {
    start: null,
    end: null,
    open: false
  };

  componentDidMount() {
    this.props.fetchHolidays();
    this.props.fetchLeaves();
  }

  handleSelectSlot = info => {
    this.setState({
      start: info.start.toLocaleDateString(),
      end: info.end.toLocaleDateString(),
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      start: null,
      end: null,
      open: false
    });
  };

  render() {
    const { classes, holidays, leaves } = this.props;
    const { open, start, end } = this.state;

    return (
      <Fragment>
        <Paper className={classes.root}>
          <BigCalendar
            className={classes.calendar}
            localizer={localizer}
            defaultDate={new Date()}
            views={["month"]}
            events={[...holidays.dates, ...leaves.dates]}
            selectable
            popup
            onSelectSlot={info => this.handleSelectSlot(info)}
            components={components}
            eventPropGetter={EventPropGetter}
          />
        </Paper>
        <LeaveRequest
          open={open}
          handleClose={this.handleClose}
          start={start}
          end={end}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  holidays: state.holidays,
  leaves: state.leaves
});

const mapDispatchToProps = dispatch => ({
  fetchHolidays: () => dispatch(fetchHolidays()),
  fetchLeaves: () => dispatch(fetchLeaves())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CalendarArea));
