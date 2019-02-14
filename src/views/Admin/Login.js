import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import { setAdmin } from "../../store/actions/adminAction";
import CustomSnackbar from "../../components/CustomSnackbar";

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

  componentDidUpdate(prevProps) {
    if (prevProps.admin.success !== this.props.admin.success) {
      if (this.props.admin.success) {
        this.props.history.push("/admin");
      }
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.setAdmin(this.state.username, this.state.password);
  };

  redirectToHome = () => {
    this.props.history.push("/");
  };

  render() {
    const { classes, admin } = this.props;

    return (
      <Fragment>
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
        <CustomSnackbar
          variant="error"
          message={admin.message}
          open={admin.error}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.admin
});

const mapDispatchToProps = dispatch => ({
  setAdmin: (username, password) => dispatch(setAdmin(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
