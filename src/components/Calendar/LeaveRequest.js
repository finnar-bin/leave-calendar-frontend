import React, { Component } from "react";
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
const readOnly = (id, label, value) => (
  <TextField
    id={id}
    label={label}
    value={value}
    margin="normal"
    fullWidth
    InputProps={{ readOnly: true }}
    InputLabelProps={{ shrink: true }}
  />
);

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

  componentDidMount() {}

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary">Submit</Button>
          <Button color="secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(LeaveRequest);
