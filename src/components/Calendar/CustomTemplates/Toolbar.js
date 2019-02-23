import React, { Fragment, Component } from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import TodayRoundedIcon from "@material-ui/icons/TodayRounded";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { withStyles } from "@material-ui/core/styles";

import { getLegendClass } from "../../../utils/styling";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit
  },
  legendLabel: {
    textAlign: "center",
    lineHeight: 2
  }
});

const NavButtons = ({ onNavigate }) => (
  <Fragment>
    <Tooltip
      enterDelay={200}
      leaveDelat={200}
      TransitionComponent={Zoom}
      title="Previous"
    >
      <IconButton aria-label="Back" onClick={() => onNavigate("PREV")}>
        <ChevronLeftRoundedIcon />
      </IconButton>
    </Tooltip>
    <Tooltip
      enterDelay={200}
      leaveDelat={200}
      TransitionComponent={Zoom}
      title="Today"
    >
      <IconButton aria-label="Back" onClick={() => onNavigate("TODAY")}>
        <TodayRoundedIcon />
      </IconButton>
    </Tooltip>
    <Tooltip
      enterDelay={200}
      leaveDelat={200}
      TransitionComponent={Zoom}
      title="Next"
    >
      <IconButton aria-label="Back" onClick={() => onNavigate("NEXT")}>
        <ChevronRightRoundedIcon />
      </IconButton>
    </Tooltip>
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
    <Typography variant="overline" className={getLegendClass("Approved")}>
      Approved
    </Typography>
    <Typography variant="overline" className={getLegendClass("Pending")}>
      Pending
    </Typography>
    <Typography variant="overline" className={getLegendClass("Holiday")}>
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
        className={classes.root}
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
