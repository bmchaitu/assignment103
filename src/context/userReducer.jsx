export default (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token
      };
    case "LOAD_USER":
      return {
        ...state,
        token: action.payload.token,
        loggedIn: action.payload.loggedIn,
        username: action.payload.username
      };
    case "REMOVE_USER":
      return {
        ...state,
        username: "",
        token: null,
        loggedIn: false
      };
    case "ADD_CAR":
      return {
        ...state,
        car: action.payload.car
      };
    case "SET_USER":
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token,
        loggedIn: true
      };
    default:
      return {
        ...state
      };
  }
};
