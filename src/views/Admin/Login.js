import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    height: "80vh"
  },
  container: {
    padding: theme.spacing.unit * 2
  },
  textField: {
    paddingBottom: theme.spacing.unit * 1.5
  },
  textCenter: {
    textAlign: "center"
  }
});

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.username, this.state.password);
  };

  redirectToHome = () => {
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <Paper className={classes.container}>
            <Typography
              variant="h2"
              gutterBottom
              className={classes.textCenter}
            >
              Admin Login
            </Typography>
            <form onSubmit={this.onSubmit}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    required
                    label="Username"
                    variant="outlined"
                    name="username"
                    fullWidth
                    onChange={this.onChange}
                    value={this.state.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    required
                    label="Password"
                    variant="outlined"
                    name="password"
                    type="password"
                    fullWidth
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <Button onClick={this.redirectToHome}>
                        Back to Calendar
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                      >
                        Log In
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
