const initState = {};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_FAILURE":
      console.log("LOGIN_FAILURE");
      return {
        ...state,
        authError: "login failed",
      };
    case "LOGIN_SUCCESS":
      console.log("LOGIN_SUCCESS");
      return {
        ...state,
        authError: null,
      };
    case "SIGNOUT_SUCCESS":
      console.log("SIGNOUT_SUCCESS");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("SIGNUP_SUCCESS");
      return {
        ...state,
        authError: null,
      };
    case "SIGNUP_FAILURE":
      console.log("SIGNUP_FAILURE");
      return {
        ...state,
        authError: action.err.massage,
      };
    default:
      return state;
  }
};

export default authReducer;
