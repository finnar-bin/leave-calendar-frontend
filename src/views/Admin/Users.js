import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import PaginatedTable from "../../components/PaginatedTable/PaginatedTable";
import AddUser from "../../components/Admin/Users/AddUser";
import { fetchUsers } from "../../store/actions/usersAction";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  }
});

const tableHeaders = ["Name", "Team", "Brand", "Leave Credits", "Actions"];

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { classes, users } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.root}>
            <Typography variant="h2">Users</Typography>
            <PaginatedTable
              tableHeaders={tableHeaders}
              data={users}
              type="users"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.root}>
            <Typography variant="h2" gutterBottom>
              Add User
            </Typography>
            <AddUser />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Users));
