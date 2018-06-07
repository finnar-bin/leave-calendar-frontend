/**
 * Checks local storage if a user is already set
 */
export const isUser = () => {
  if (localStorage.getItem('name') && localStorage.getItem('userId')) return true;
  return false;
}

export const changeUser = () => {
  localStorage.removeItem('name');
  localStorage.removeItem('userId');
}