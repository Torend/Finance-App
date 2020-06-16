const initState = {};

const stockReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_SUCCESS":
      console.log("ADD_SUCCESS");
      return {
        ...state,
        addState: "Add Success",
      };
    case "ADD_FAILURE":
      console.log("ADD_FAILURE");
      return {
        ...state,
        addState: "Add failure",
      };
    case  "ADD_FAILURE_WORNG_SYMBOL":
      console.log("WORNG_SYMBOL");
      return {
        ...state,
        addState: "Symbol not found",
      };
    case "ADD_DONE":
      console.log("DONE");
      return {};
    default:
      return state;
  }
};

export default stockReducer;
