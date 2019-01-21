import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  switchUser: {
    float: "right"
  }
});

class Info extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Hello, Nar Cuenca!</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button color="secondary" className={classes.switchUser}>
                Switch User
              </Button>
            </Grid>
          </Grid>
          <Typography variant="subtitle1">
            You have 0 leave credit(s) remaining.
          </Typography>
          <Typography variant="subtitle1">
            You have 0 upcoming leave(s).
          </Typography>
          <Typography variant="subtitle1">
            You have 2 pending leave(s).
          </Typography>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Info);
