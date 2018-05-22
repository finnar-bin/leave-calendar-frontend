import axios from 'axios';

const API_URI = process.env.REACT_APP_API_GATEWAY;

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

export const updateUser = async (id, fullName, leaveCredits) => {
  return await resolve(axios.patch(`${API_URI}/user/${id}`, {
    fullName,
    leaveCredits
  }, {
    headers: {
      'x-auth': localStorage.getItem('token')
    }
  })
  .then(response => response.data));
}