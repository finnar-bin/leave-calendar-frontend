import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";

import { editUser } from "../../../store/actions/usersAction";

const teams = ["Web Developer", "Graphic Artist"];
const brands = ["Ladbrokes", "Coral", "Gala", "Cashcade"];

class EditUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    team: "",
    brand: "",
    leaveCredits: ""
  };

  componentDidMount() {
    const { firstName, lastName, team, brand, leaveCredits } = this.props.row;
    this.setState({
      firstName,
      lastName,
      team,
      brand,
      leaveCredits
    });
  }

  handleEditChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const { firstName, lastName, team, brand, leaveCredits } = this.state;
    const { _id } = this.props.row;
    this.props.editUser(_id, firstName, lastName, team, brand, leaveCredits);
    this.props.cancelEdit();
  };

  render() {
    const { cancelEdit } = this.props;
    return (
      <Fragment>
        <TableCell component="th" scope="row" align="center">
          <input
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleEditChange}
          />
          <input
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleEditChange}
          />
        </TableCell>
        <TableCell align="center">
          <select
            name="team"
            value={this.state.team}
            onChange={this.handleEditChange}
          >
            {teams.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
        </TableCell>
        <TableCell align="center">
          <select
            name="brand"
            value={this.state.brand}
            onChange={this.handleEditChange}
          >
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </TableCell>
        <TableCell align="center">
          <input
            name="leaveCredits"
            type="number"
            value={this.state.leaveCredits}
            onChange={this.handleEditChange}
          />
        </TableCell>
        <TableCell align="center">
          <Button size="small" color="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
          <Button size="small" color="secondary" onClick={() => cancelEdit()}>
            Cancel
          </Button>
        </TableCell>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  editUser: (id, firstName, lastName, team, brand, leaveCredits) =>
    dispatch(editUser(id, firstName, lastName, team, brand, leaveCredits))
});

export default connect(
  null,
  mapDispatchToProps
)(EditUser);
