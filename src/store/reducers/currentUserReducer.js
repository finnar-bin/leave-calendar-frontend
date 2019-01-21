const initState = {
  user: {
    firstName: "John",
    lastName: "Wick",
    credits: 100
  },
  error: false
};

const currentUserReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER_SUCCESS":
      console.log(action);
      return Object.assign({}, state, {
        user: action.user,
        error: action.error
      });

    case "SET_USER_ERROR":
      console.log(action);
      return Object.assign({}, state, {
        user: action.user,
        error: action.user
      });

    case "UNSET_USER":
      console.log(action);
      return Object.assign({}, state, {
        user: action.user,
        error: action.error
      });

    default:
      return state;
  }
};

export default currentUserReducer;
