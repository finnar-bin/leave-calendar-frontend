import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import TableActions from "./TableActions";
import { formatDate } from "../../utils/dateHelpers";
import { getLegendClass } from "../../utils/styling";
import EditUser from "../Admin/Users/EditUser";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    midWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class PaginatedTable extends Component {
  state = {
    page: 0,
    rowsPerPage: 10,
    editUserId: null
  };

  handleChangePage = (e, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = e => {
    this.setState({ page: 0, rowsPerPage: e.target.value });
  };

  handleEditUser = id => {
    this.setState({ editUserId: id });
  };

  handleCancelEdit = () => {
    this.setState({ editUserId: null });
  };

  render() {
    const { classes, data, tableHeaders, type } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const tableBody = row => {
      if (type === "leaves") {
        return (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row" align="center">
              {row.title}
            </TableCell>
            <TableCell align="center">{row.user.team}</TableCell>
            <TableCell align="center">{row.user.brand}</TableCell>
            <TableCell align="center">{`${formatDate(
              row.start,
              "MMM D h:mm A"
            )} - ${formatDate(row.end, "MMM D h:mm A")}`}</TableCell>
            <TableCell align="center">
              <Typography
                variant="outline"
                className={getLegendClass(row.status)}
              >
                {row.status}
              </Typography>
            </TableCell>
            <TableCell>
              <Button size="small" color="primary">
                Approve
              </Button>
              <Button size="small" color="secondary">
                Reject
              </Button>
            </TableCell>
          </TableRow>
        );
      } else if (type === "users") {
        return (
          <TableRow key={row._id}>
            {this.state.editUserId === row._id ? (
              <EditUser row={row} cancelEdit={this.handleCancelEdit} />
            ) : (
              <Fragment>
                <TableCell component="th" scope="row" align="center">
                  {row.firstName} {row.lastName}
                </TableCell>
                <TableCell align="center">{row.team}</TableCell>
                <TableCell align="center">{row.brand}</TableCell>
                <TableCell align="center">{row.leaveCredits}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => this.handleEditUser(row._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => this.props.removeUser(row._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </Fragment>
            )}
          </TableRow>
        );
      }
    };

    return (
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={index} align="center">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => tableBody(row))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25]}
                colSpan={tableHeaders.length}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TableActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(PaginatedTable);
