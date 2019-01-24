import React, { Component } from "react";
import { connect } from "react-redux";
import EventIcon from "@material-ui/icons/Event";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import { computeDeduction, getTime, getType } from "../../utils/leaveHelpers";
import { fileLeave } from "../../store/actions/leavesAction";

// used for the Dialog menu
const Transition = props => <Slide direction="up" {...props} />;

const styles = theme => ({
  icon: {
    verticalAlign: "middle",
    fontSize: "2em"
  }
});

const times = [
  {
    value: 0,
    label: "Whole Day"
  },
  {
    value: 1,
    label: "Half Day AM"
  },
  {
    value: 2,
    label: "Half Day PM"
  }
];

const types = [
  {
    value: 0,
    label: "Paid Leave"
  },
  {
    value: 1,
    label: "Leave Without Pay"
  }
];

// Helper function to generate readonly textfields
const readOnly = (id, label, value) => {
  if (value === null) {
    value = ""
  }
  return (
  <TextField
    id={id}
    label={label}
    value={value}
    margin="normal"
    fullWidth
    InputProps={{ readOnly: true }}
    InputLabelProps={{ shrink: true }}
  />
)};

// Helper function to generate select textfields
const select = (id, label, value, onChange, menuItems) => (
  <TextField
    id={id}
    select
    label={label}
    value={value}
    onChange={onChange}
    margin="normal"
    fullWidth
  >
    {menuItems.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);

class LeaveRequest extends Component {
  // Legend:
  // time -> 0 = Whole Day, 1 = Half Day AM, 2 = Half Day PM
  // type -> 0 = Paid Leave, 1 = LWOP
  state = {
    time: 0,
    type: 0
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  handleSubmit = async () => {
    const name = `${this.props.currentUser.firstName} ${
      this.props.currentUser.lastName
    }`;
    // Get start and end times
    let time = getTime(this.state.time);

    // Get start and end dates
    let date = {
      start: `${this.props.start} ${time.start}`,
      end: `${this.props.end} ${time.end}`
    };

    // Get Leave Type
    let type = getType(this.state.type);

    // Compute leave credits to be deducted
    const deduction = computeDeduction(
      this.state.type,
      this.state.time,
      this.props.start,
      this.props.end
    );

    // send leave to backend
    this.props.addLeave(name, type, date.start, date.end, deduction);
    this.setState({
      time: 0,
      type: 0
    });
    this.props.handleClose();
  };

  render() {
    const { classes, open, handleClose, start, end } = this.props;
    const { time, type } = this.state;

    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="leave-dialog-slide-title"
        aria-describedby="leave-dialog-slide-description"
      >
        <DialogTitle id="leave-dialog-slide-title">
          <EventIcon className={classes.icon} /> File a leave?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="leave-dialog-slide-description">
            Note: Please make sure to NOT include dates that fall on the
            weekend.
          </DialogContentText>
          <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                {readOnly("start-date", "Start Date", start)}
              </Grid>
              <Grid item xs={12} sm={6}>
                {readOnly("end-date", "End Date", end)}
              </Grid>
            </Grid>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                {select("time", "Time", time, this.handleChange("time"), times)}
              </Grid>
              <Grid item xs={12} sm={6}>
                {select("type", "Type", type, this.handleChange("type"), types)}
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
          <Button color="secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser.user
});

const mapDispatchToProps = dispatch => ({
  addLeave: (name, type, start, end, deduction) =>
    dispatch(fileLeave(name, type, start, end, deduction))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LeaveRequest));
