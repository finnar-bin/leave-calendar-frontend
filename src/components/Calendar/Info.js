import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {
  setCurrentUser,
  unsetCurrentUser
} from "../../store/actions/currentUserAction";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  switchUser: {
    float: "right"
  }
});

class Info extends Component {
  componentDidMount() {
    // check if there's a saved userId,
    // if none, redirect to user selection page
    // if there is, fetch userId data
    // and set info on page
    const userId = localStorage.getItem("userId");
    if (userId) {
      this.props.setCurrentUser(userId);
    } else {
      this.props.history.push("/");
    }
  }

  handleClick = () => {
    this.props.unsetCurrentUser();
    this.props.history.push("/");
  };

  render() {
    const { classes, currentUser } = this.props;
    const name = `${currentUser.firstName} ${currentUser.lastName}`;
    const credits = currentUser.credits;

    return (
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Hello, {name}!</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                color="secondary"
                className={classes.switchUser}
                onClick={() => this.handleClick()}
              >
                Switch User
              </Button>
            </Grid>
          </Grid>
          <Typography variant="subtitle1">
            You have {credits} leave credit(s) remaining.
          </Typography>
          <Typography variant="subtitle1">
            You have X upcoming leave(s).
          </Typography>
          <Typography variant="subtitle1">
            You have X pending leave(s).
          </Typography>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser.user,
  error: state.currentUser.error
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: id => dispatch(setCurrentUser(id)),
  unsetCurrentUser: () => dispatch(unsetCurrentUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Info));
