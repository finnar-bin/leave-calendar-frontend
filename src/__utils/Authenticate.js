/**
 * Checks local storage if a token is available
 */
export const authenticate = {
  authenticate() {
    if (localStorage.getItem('token')) return true;
    return false;
  },
  signout() {
    localStorage.removeItem('token');
  }
}