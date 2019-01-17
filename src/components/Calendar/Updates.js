import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    minHeight: "80vh",
    padding: theme.spacing.unit
  }
});

class Updates extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography variant="h4">Upcoming Leaves</Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(Updates);
