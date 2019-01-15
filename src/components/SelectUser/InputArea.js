import React, { Component } from "react";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { fetchUsers } from "../../store/actions/usersAction";

const styles = theme => ({
  root: {
    margin: "0 5vw",
    paddingBottom: theme.spacing.unit * 6,
    paddingTop: theme.spacing.unit * 6
  },
  formControl: {
    width: "50%",
    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2
  },
  button: {
    display: "block",
    margin: "0 auto",
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  }
});

class InputArea extends Component {
  state = {
    selectedId: 0
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleChange = e => {
    console.log(e);
    this.setState({
      selectedId: e.target.value
    });
  };

  handleClick = e => {
    alert(this.state.selectedId);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper elevation={10} className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Select your name below...
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            value={this.state.selectedId}
            onChange={this.handleChange}
            name="name"
            displayEmpty
          >
            <MenuItem value={0} disabled>
              <em>Choose here</em>
            </MenuItem>
            <MenuItem value={5}>Susan Boyle</MenuItem>
            <MenuItem value={1050}>Jack Sparrow</MenuItem>
          </Select>
          <FormHelperText>Required*</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.button}
          disabled={this.state.selectedId === 0}
          onClick={this.handleClick}
        >
          Proceed
        </Button>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  error: state.users.error
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InputArea));
