/**
 * Checks local storage if a token is available
 */
export const authenticate = () => {
  if (localStorage.getItem('token')) return true;
  return false;
}

export const signout = () => {
  localStorage.removeItem('token');
}