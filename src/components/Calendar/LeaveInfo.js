import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import StarBorderRounded from "@material-ui/icons/StarBorderRounded";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { fetchLeaveInfo } from "../../store/actions/leavesAction";

// Dialog transition settings
const Transition = props => <Slide direction="up" {...props} />;

// helper function to format dates for display
const formatDate = dateObject => moment(dateObject).format("MMM D h:mm A");

// get legend class
const getLegendClass = (type, classes) => {
  switch (type) {
    case "Approved":
      return [classes.legends, classes.approved];

    case "Pending":
      return [classes.legends, classes.pending];

    default:
      break;
  }
};

const styles = theme => ({
  icon: {
    verticalAlign: "middle",
    fontSize: "2em"
  },
  dialogContent: {
    padding: theme.spacing.unit * 3
  },
  body: {
    textAlign: "center",
    border: "2px solid #000",
    borderRadius: "5px",
    position: "relative",
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3
  },
  bodyTitle: {
    position: "absolute",
    top: "-20%",
    width: "100%"
  },
  bodyTitleText: {
    backgroundColor: "#fff",
    padding: theme.spacing.unit
  },
  legends: {
    color: "#fff",
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    borderRadius: "5px",
    lineHeight: 2
  },
  approved: {
    backgroundColor: "#3f51b5"
  },
  pending: {
    backgroundColor: "#f50057"
  }
});

const DialogBody = ({ leaveInfo, classes }) => (
  <Grid container className={classes.body} spacing={8}>
    <Grid item xs={12} className={classes.bodyTitle}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h4" className={classes.bodyTitleText}>
            {leaveInfo.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="overline"
            className={getLegendClass(leaveInfo.status, classes)}
          >
            {leaveInfo.status}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="h5">{formatDate(leaveInfo.start)}</Typography>
      <Typography variant="caption">Start Date</Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="h5">{formatDate(leaveInfo.end)}</Typography>
      <Typography variant="caption">End Date</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h5">{leaveInfo.type}</Typography>
      <Typography variant="caption">Type</Typography>
    </Grid>
  </Grid>
);

class LeaveInfo extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.eventId !== prevProps.eventId) {
      this.props.fetchLeaveInfo(this.props.eventId);
    }
  }

  render() {
    const { handleClose, open, leaveInfo, classes } = this.props;

    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="leave-info-dialog-slide-title"
      >
        <DialogTitle id="leave-info-dialog-slide-title">
          <StarBorderRounded className={classes.icon} /> Leave Details
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogBody leaveInfo={leaveInfo} classes={classes} />
        </DialogContent>
        <DialogActions>text</DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  leaveInfo: state.leaves.leaveInfo
});

const mapDispatchToProps = dispatch => ({
  fetchLeaveInfo: id => dispatch(fetchLeaveInfo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LeaveInfo));
