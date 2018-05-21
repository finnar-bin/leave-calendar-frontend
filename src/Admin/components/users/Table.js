import React from 'react';
import propTypes from 'prop-types';


const Table = (props) => {
  let users = props.users.map((data) => {
    return (
      <tr key={data._id}>
        <td>{data.fullName}</td>
        <td>{data.leaveCredits}</td>
        <td>
          <button className="btn btn-outline-success btn-sm mx-1">Edit</button>
          <button className="btn btn-outline-danger btn-sm mx-1">Remove</button>
        </td>
      </tr>
    )
  });

  return (
    <table className="table table-hover text-center">
      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th>Leave Credits</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  users: propTypes.array
}

export default Table;