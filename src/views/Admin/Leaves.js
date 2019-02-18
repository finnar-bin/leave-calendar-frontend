import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import PaginatedTable from "../../components/PaginatedTable/PaginatedTable";
import { fetchLeaves } from "../../store/actions/leavesAction";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  }
});

const tableHeaders = ["Name", "Team", "Brand", "Inclusive Dates", "Actions"];

class Leaves extends Component {
  componentDidMount() {
    this.props.fetchLeaves();
    console.log(this.props.leaves);
  }

  render() {
    const { classes, leaves } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="h2">Leaves</Typography>
        <PaginatedTable
          tableHeaders={tableHeaders}
          leaves={leaves}
          type="leaves"
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  leaves: state.leaves.dates
});

const mapDispatchToProps = dispatch => ({
  fetchLeaves: () => dispatch(fetchLeaves())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Leaves));
