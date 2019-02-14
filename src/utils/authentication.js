/**
 * Checks localStorage if token is present
 * @returns {boolean}
 */
export const isAdmin = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};
