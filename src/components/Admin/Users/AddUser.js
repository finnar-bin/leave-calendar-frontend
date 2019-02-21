import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { addUser } from "../../../store/actions/usersAction";

const teams = ["Web Developer", "Graphic Artist"];
const brands = ["Ladbrokes", "Coral", "Gala", "Cashcade"];

const styles = theme => ({
  formControl: {
    minWidth: "100%"
  },
  gridContainer: {
    paddingBottom: theme.spacing.unit * 2
  }
});

class AddUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    team: "",
    brand: "",
    leaveCredits: 0,
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlesubmit = e => {
    e.preventDefault();
    this.props.addUser(
      this.state.firstName,
      this.state.lastName,
      this.state.team,
      this.state.brand,
      this.state.leaveCredits
    );
  };

  handleClear = () => {
    this.setState({
      firstName: "",
      lastName: "",
      team: "",
      brand: "",
      leaveCredits: 0
    });
  };

  render() {
    const { classes } = this.props;
    const isDisabled = () => {
      if (
        this.state.firstName === "" ||
        this.state.lastName === "" ||
        this.state.team === "" ||
        this.state.brand === ""
      ) {
        return true;
      } else {
        return false;
      }
    };

    return (
      <Grid container>
        <Grid container className={classes.gridContainer} spacing={16}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              variant="outlined"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.gridContainer} spacing={16}>
          <Grid item xs={12} sm={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-team"
              >
                Team
              </InputLabel>
              <Select
                required
                value={this.state.team}
                onChange={this.handleChange}
                input={
                  <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name="team"
                    id="outlined-team"
                  />
                }
              >
                {teams.map((team, index) => (
                  <MenuItem key={index} value={team}>
                    {team}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-brand"
              >
                Brand
              </InputLabel>
              <Select
                required
                value={this.state.brand}
                onChange={this.handleChange}
                input={
                  <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name="brand"
                    id="outlined-brand"
                  />
                }
              >
                {brands.map((brand, index) => (
                  <MenuItem key={index} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="number"
              required
              fullWidth
              label="Leave Credits"
              variant="outlined"
              name="leaveCredits"
              value={this.state.leaveCredits}
              onChange={this.handleChange}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} className={classes.gridContainer}>
            <Button
              onClick={this.handlesubmit}
              variant="contained"
              color="primary"
              fullWidth
              disabled={isDisabled()}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" onClick={this.handleClear} fullWidth>
              Clear
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addUser: (firstName, lastName, team, brand, leaveCredits) =>
    dispatch(addUser(firstName, lastName, team, brand, leaveCredits))
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(AddUser));
