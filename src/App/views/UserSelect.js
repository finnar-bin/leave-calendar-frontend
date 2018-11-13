import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import { Redirect } from "react-router-dom";

import { fetchUsers } from "../store/actions/usersActions";
import banner from "../assets/img/banner.png";
import Button from "../ui/Button";

const styles = {
  select__wrapper: {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -30%)"
  }
};

class UserSelect extends Component {
  state = {
    selectedName: null,
    selectedId: "default"
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  selectChange = e => {
    this.setState({
      selectedName: e.target.options[e.target.selectedIndex].text,
      selectedId: e.target.value
    });
  };

  selectSubmit = () => {
    localStorage.setItem("name", this.state.selectedName);
    localStorage.setItem("userId", this.state.selectedId);
    this.props.history.push("/calendar");
  };

  render() {
    const sortedUsers = _.sortBy(this.props.users, [user => user.lastName]);
    const userDropdown = sortedUsers.map(user => {
      return (
        <option key={user._id} value={user._id}>
          {user.firstName} {user.lastName}
        </option>
      );
    });

    return (
      <Fragment>
        {this.props.error ? (
          <Redirect to="/error/503" />
        ) : (
          <div className="text-center" style={styles.select__wrapper}>
            <img src={banner} alt="banner" className="py-3" />
            <h1>Welcome, Stranger!</h1>
            <p className="text-muted">
              Introduce yourself by picking your name below.
            </p>
            <hr />
            <select
              className="form-control form-control-lg mb-3"
              value={this.state.selectedId}
              onChange={this.selectChange}
            >
              <option disabled value="default">
                Choose here...
              </option>
              {userDropdown}
            </select>
            <Button
              text="Proceed"
              kind="primary"
              size="large"
              outline
              clickAction={this.selectSubmit}
              disabled={this.state.selectedId === "default" ? true : false}
            />
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    users: state.users.users,
    error: state.users.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  };
};

UserSelect.propTypes = {
  fetchUsers: PropTypes.func,
  users: PropTypes.array,
  history: PropTypes.object,
  error: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSelect);
