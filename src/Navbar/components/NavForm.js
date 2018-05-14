import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class NavForm extends Component {
  state = {
    formValue: ''
  }

  handleChange = (e) => {
    this.setState({ formValue: e.target.value })
  }

  resetInputField = () => {
    this.setState({ formValue: '' })
  }
  
  render() {
    return (
      <form className="form-inline">
        <input
          value={this.state.formValue}
          onChange={this.handleChange}
          type="text"
          className="form-control mr-sm-2"
          placeholder="Find user..."
        />
        <NavLink
          to={"/search/" + this.state.formValue}
          onClick={this.resetInputField}
          className="btn btn-outline-success my-2 my-sm-0"
        >
          Search
        </NavLink>
      </form>
    );
  }
}

export default NavForm;