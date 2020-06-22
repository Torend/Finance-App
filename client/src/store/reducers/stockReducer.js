const initState = {};
let update = false;

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
    case "ADD_FAILURE_WORNG_SYMBOL":
      console.log("WORNG_SYMBOL");
      return {
        ...state,
        addState: "Symbol not found",
      };
    case "ADD_DONE":
      console.log("DONE");
      return {
        ...state,
        addState: "",
      };
    case "SELL_SUCCESS":
      console.log("SELL_SUCCESS");
      update = !update;
      return {
        ...state,
        sellState: update,
      };
    case "SELL_FAILURE":
      console.log("SELL_FAILURE", action.err);
      return state;
    case "UPDATE_SUCCESS":
      console.log("UPDATE_SUCCESS");
      update = !update;
      return {
        ...state,
        sellState: update,
      };
    case "UPDATE_FAILURE":
      console.log("UPDATE_FAILURE", action.err);
      return state;
    case "ADD_EXIST_STOCK_SUCCESS":
      console.log("ADD_EXIST_STOCK_SUCCESS");
      return {
        ...state,
        addState: "Add Success",
      };
    case "ADD_EXIST_STOCK_FAILURE":
      console.log("ADD_EXIST_STOCK_FAILURE");
      return state;
    default:
      return state;
  }
};

export default stockReducer;
