import React, { Fragment, Component } from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import TodayRoundedIcon from "@material-ui/icons/TodayRounded";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  legendLabel: {
    textAlign: "center",
    lineHeight: 2
  },
  legends: {
    color: "#fff",
    paddingLeft: theme.spacing.unit * 0.5,
    paddingRight: theme.spacing.unit * 0.5,
    borderRadius: "5px",
    display: "inline-block",
    lineHeight: 2,
    marginLeft: theme.spacing.unit * 0.5,
    marginRight: theme.spacing.unit * 0.5,
    marginBottom: theme.spacing.unit * 0.5
  },
  approved: {
    backgroundColor: "#3f51b5"
  },
  pending: {
    backgroundColor: "#f50057"
  },
  holiday: {
    backgroundColor: "#F05223"
  }
});

const NavButtons = ({ onNavigate }) => (
  <Fragment>
    <IconButton aria-label="Back" onClick={() => onNavigate("PREV")}>
      <ChevronLeftRoundedIcon />
    </IconButton>
    <IconButton aria-label="Back" onClick={() => onNavigate("TODAY")}>
      <TodayRoundedIcon />
    </IconButton>
    <IconButton aria-label="Back" onClick={() => onNavigate("NEXT")}>
      <ChevronRightRoundedIcon />
    </IconButton>
  </Fragment>
);

const Date = ({ date }) => (
  <Typography variant="h5">
    {moment(date).format("MMMM")} {moment(date).format("YYYY")}
  </Typography>
);

const Legends = ({ classes }) => (
  <Fragment>
    <Typography variant="overline" className={classes.legendLabel}>
      Legends:
    </Typography>
    <Typography
      variant="overline"
      className={[classes.legends, classes.approved]}
    >
      Approved
    </Typography>
    <Typography
      variant="overline"
      className={[classes.legends, classes.pending]}
    >
      Pending
    </Typography>
    <Typography
      variant="overline"
      className={[classes.legends, classes.holiday]}
    >
      Holiday
    </Typography>
  </Fragment>
);

class Toolbar extends Component {
  render() {
    const { classes, onNavigate, date } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <NavButtons onNavigate={onNavigate} />
        </Grid>
        <Grid item>
          <Date date={date} />
        </Grid>
        <Grid item>
          <Legends classes={classes} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Toolbar);
