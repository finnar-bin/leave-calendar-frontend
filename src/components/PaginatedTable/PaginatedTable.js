import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";

import TableActions from "./TableActions";
import { formatDate } from "../../utils/dateHelpers";

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
    rowsPerPage: 5
  };

  handleChangePage = (e, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = e => {
    this.setState({ page: 0, rowsPerPage: e.target.value });
  };

  render() {
    const { classes, leaves, tableHeaders, type } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, leaves.length - page * rowsPerPage);
    const tableBody = row => {
      if (type === "leaves") {
        return (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.title}
            </TableCell>
            <TableCell>{row.user.team}</TableCell>
            <TableCell>{row.user.brand}</TableCell>
            <TableCell>{`${formatDate(
              row.start,
              "MMM D h:mm A"
            )} - ${formatDate(row.end, "MMM D h:mm A")}`}</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        );
      }
    };

    return (
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {tableHeaders.map(header => (
                <TableCell>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves
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
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={tableHeaders.length}
                count={leaves.length}
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
