import React, { Component } from "react";
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
import Button from "@material-ui/core/Button";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

import { fetchLeaveInfo, removeLeave } from "../../store/actions/leavesAction";
import { computeCredits } from "../../utils/leaveHelpers";
import { getLegendClass } from "../../utils/styling";
import { formatDate } from "../../utils/dateHelpers";

// Dialog transition settings
const Transition = props => <Slide direction="up" {...props} />;

const styles = theme => ({
  icon: {
    verticalAlign: "middle",
    fontSize: "2em"
  },
  dialogContent: {
    padding: theme.spacing.unit * 3
  },
  dialogActions: {
    paddingRight: theme.spacing.unit * 1.5,
    paddingLeft: theme.spacing.unit * 1.5
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
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
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
            className={getLegendClass(leaveInfo.status)}
          >
            {leaveInfo.status}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="h5">
        {formatDate(leaveInfo.start, "MMM D h:mm A")}
      </Typography>
      <Typography variant="caption">Start Date</Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="h5">
        {formatDate(leaveInfo.end, "MMM D h:mm A")}
      </Typography>
      <Typography variant="caption">End Date</Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h5">{leaveInfo.type}</Typography>
      <Typography variant="caption">Type</Typography>
    </Grid>
  </Grid>
);

const DialogButtons = ({ leaveInfo, classes, currentUser, deleteClick }) => {
  const { firstName, lastName } = currentUser;
  const username = `${firstName} ${lastName}`;

  if (username === leaveInfo.title) {
    return (
      <Button
        color="secondary"
        className={classes.button}
        onClick={(id, type, start, end) =>
          deleteClick(
            leaveInfo.id,
            leaveInfo.type,
            leaveInfo.start,
            leaveInfo.end
          )
        }
      >
        Delete
        <DeleteRoundedIcon className={classes.rightIcon} />
      </Button>
    );
  } else {
    return "";
  }
};

class LeaveInfo extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.eventId !== prevProps.eventId) {
      this.props.fetchLeaveInfo(this.props.eventId);
    }
  }

  handleSubmit = (id, type, start, end) => {
    // extract times from date string
    const startTime = formatDate(start, "h:mm A");
    const endTime = formatDate(end, "h:mm A");

    // extract dates from date string
    let leaveStart = formatDate(start, "M/D/YYYY");
    let leaveEnd = formatDate(end, "M/D/YYYY");

    // prepare values for the credit computation
    let leaveType = null;
    let leaveTime = null;

    switch (type) {
      case "Vacation Leave":
        leaveType = 0;
        break;

      case "Leave Without Pay":
        leaveType = 1;
        break;

      default:
        break;
    }

    if (startTime === "9:00 AM" && endTime === "6:00 PM") {
      leaveTime = 0;
    } else {
      leaveTime = 1;
    }

    // compute credits to be refunded
    const creditsToAdd = computeCredits(
      leaveType,
      leaveTime,
      leaveStart,
      leaveEnd
    );

    // send to action for processing
    this.props.removeLeave(id, creditsToAdd);
    this.props.handleClose();
  };

  render() {
    const { handleClose, open, classes } = this.props;

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
          <DialogBody {...this.props} />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <DialogButtons
            {...this.props}
            deleteClick={(id, type, start, end) =>
              this.handleSubmit(id, type, start, end)
            }
          />
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  leaveInfo: state.leaves.leaveInfo,
  currentUser: state.currentUser.user
});

const mapDispatchToProps = dispatch => ({
  fetchLeaveInfo: id => dispatch(fetchLeaveInfo(id)),
  removeLeave: (id, creditsToAdd) => dispatch(removeLeave(id, creditsToAdd))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LeaveInfo));
