import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { fetchCurrentUserLeaves } from "../../store/actions/leavesAction";

const styles = theme => ({
  root: {
    height: "64.5vh",
    padding: theme.spacing.unit
  }
});

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
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <Typography variant="h5" gutterBottom>
            Your Upcoming Leaves
          </Typography>
          <Divider />
          <Typography variant="h5" color="textSecondary">
            Coming soon...
          </Typography>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  leaves: state.leaves.dates,
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
