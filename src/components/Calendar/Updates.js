import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { fetchCurrentUserLeaves } from "../../store/actions/leavesAction";
import { getLegendClass } from "../../utils/styling";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
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

const ListLeaves = ({ leaves, classes }) => {
  return leaves.map(leave => {
    const startDate = moment(leave.start).format("ddd, D MMM YYYY");
    const endDate = moment(leave.end).format("ddd, D MMM YYYY");
    const startTime = moment(leave.start).format("h:mm A");
    const endTime = moment(leave.end).format("h:mm A");
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
            <Typography variant="h6">{date}</Typography>
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
  componentDidMount() {
    setTimeout(() => {
      const name = `${this.props.currentUser.firstName} ${
        this.props.currentUser.lastName
      }`;
      this.props.fetchCurrentUserLeaves(name);
    }, 3000);
  }

  render() {
    const { classes, currentUserLeaves } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <Typography variant="h5" gutterBottom>
            Your Upcoming Leaves
          </Typography>
          <Divider />
          <Grid
            container
            directiontion="column"
            className={classes.leavesContainer}
          >
            <ListLeaves leaves={currentUserLeaves} {...this.props} />
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentUserLeaves: state.leaves.currentUserLeaves,
  currentUser: state.currentUser.user
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentUserLeaves: name => dispatch(fetchCurrentUserLeaves(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Updates));
