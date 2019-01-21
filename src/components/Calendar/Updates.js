import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    height: "64.5vh",
    padding: theme.spacing.unit
  }
});

class Updates extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <Typography variant="h4">Upcoming Leaves</Typography>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Updates);
