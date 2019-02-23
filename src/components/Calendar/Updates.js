import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { getLegendClass } from "../../utils/styling";
import { formatDate, isAfterToday } from "../../utils/dateHelpers";

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  leavesContainer: {
    height: "65.8vh",
    overflowX: "auto"
  },
  leaveItem: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

const ListLeaves = ({ leaves, classes, currentUser }) => {
  const name = `${currentUser.firstName} ${currentUser.lastName}`;
  const userLeaves = leaves.filter(
    leave => leave.title === name && isAfterToday(leave.start)
  );
  return userLeaves.map(leave => {
    const startDate = formatDate(leave.start, "ddd, D MMM YYYY");
    const endDate = formatDate(leave.end, "ddd, D MMM YYYY");
    const startTime = formatDate(leave.start, "h:mm A");
    const endTime = formatDate(leave.end, "h:mm A");
    let date = "";

    if (startDate === endDate) {
      date = startDate;
    } else {
      date = `${startDate} — ${endDate}`;
    }

    return (
      <Grid item xs={12} className={classes.leaveItem}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="subtitle1">
              <strong>{date}</strong>
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="overline"
              className={getLegendClass(leave.status)}
            >
              {leave.status}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary">
          {startTime} &mdash; {endTime}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {leave.type}
        </Typography>
      </Grid>
    );
  });
};

class Updates extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <Typography variant="h6" gutterBottom>
            Your Upcoming Leaves
          </Typography>
          <Divider />
          <Grid
            container
            alignContent="flex-start"
            className={classes.leavesContainer}
          >
            <ListLeaves {...this.props} />
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  leaves: state.leaves.dates,
  currentUser: state.currentUser.user
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Updates));
