import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const API_URI = process.env.REACT_APP_API_GATEWAY;

/**
 * Helper function to properly resolve promises returned by axios
 * @param {object} promise
 * @returns {object} parsed promise result
 */
const resolve = async (promise) => {
  let result = {
    data: null,
    error: null
  }

  try {
    result.data = await promise;
  } catch (error) {
    result.error = error.response;
  }

  return result;
}

/**
 * Fetch list of users from database
 * @returns {array} list of all users
 */
export const getUsers = async () => {
  return await resolve(
    axios.get(`${API_URI}/user`)
    .then(response => response.data)
  );
}

/**
 * Update user info
 * @param {string} id user id to be update
 * @param {string} fullName updated user full name
 * @param {number} leaveCredits updated user leave credits
 * @returns {object} result sent as promise
 */
export const updateUser = async (id, fullName, leaveCredits) => {
  return await resolve(
    axios.patch(`${API_URI}/user/${id}`, {
      fullName,
      leaveCredits
    }, {
      headers: {
        'x-auth': localStorage.getItem('token')
      }
    }).then(response => response.data)
  );
}

/**
 * Log in as Admin
 * @param {string} username admin username
 * @param {string} password admin password
 * @returns {object} result sent as promise
 */
export const loginAdmin = async (userName, password) => {
  return await resolve(
    axios.post(`${API_URI}/admin/signin`, {
      userName,
      password
    }).then(response => response.data)
  );
}

/**
 * Add new user
 * @param {string} fullName new user full name
 * @param {number} leaveCredits new user leave credits
 * @returns {object} result setn as promise
 */
export const newUser = async (fullName, leaveCredits) => {
  return await resolve(
    axios.post(`${API_URI}/user`, {
      fullName,
      leaveCredits
    }, {
      headers: {
        'x-auth': localStorage.getItem('token')
      }
    }).then(response => response.data)
  );
}

/**
 * Delete user
 * @param {string} id user id to be deleted
 * @returns {object} result setn as promise
 */
export const removeUser = async (id) => {
  return await resolve(
    axios.delete(`${API_URI}/user/${id}`, {
      headers: {
        'x-auth': localStorage.getItem('token')
      }
    }).then(response => response.data)
  );
}