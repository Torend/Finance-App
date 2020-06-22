import firebase from "../../config/firebaseConfig";

export const addStock = (stock) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    var d = new Date();
    getSymbolPrice(stock.symbol).then((res) => {
      if (res.express == null || res.express.includes("No results"))
        return dispatch({ type: "ADD_FAILURE_WORNG_SYMBOL" });
      firestore
        .collection("usersInfo")
        .doc(userId)
        .collection("stocks")
        .add({
          symbol: stock.symbol,
          amount: stock.amount,
          price: stock.price,
          value: stock.price * stock.amount,
          time: d,
        })
        .then(() => {
          dispatch({ type: "ADD_SUCCESS" });
        })
        .catch((err) => {
          dispatch({ type: "ADD_FAILURE", err });
        });
    });
  };
};


export const addExistStock = (stock) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    var d = new Date();
    firestore
      .collection("usersInfo")
      .doc(userId)
      .collection("stocks")
      .where("symbol", "==", stock.symbol)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .update({
              price: stock.newPrice,
              amount: stock.newAmount,
              value: stock.newAmount * stock.newPrice
            })
            .then(() => {
              dispatch({ type: "ADD_EXIST_STOCK_SUCCESS"})
            })
            .catch((err) => {
              dispatch({ type: "ADD_EXIST_STOCK_FAILURE", err });
            });
        });
      })
      .catch((err) => {
        dispatch({ type: "ADD_EXIST_STOCK_FAILURE", err });
      });
  };
};

export const addSuccess = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: "ADD_DONE" });
  };
};

export const sellStock = (stock) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    var d = new Date();
    firestore
      .collection("usersInfo")
      .doc(userId)
      .collection("stocks")
      .where("symbol", "==", stock.symbol)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              firestore
                .collection("usersInfo")
                .doc(userId)
                .collection("salesRecord")
                .add({
                  symbol: stock.symbol,
                  amount: stock.amount,
                  buyPrice: stock.buyPrice,
                  sellPrice: stock.sellPrice,
                  time: d,
                })
                .then(() => {
                  dispatch({ type: "SELL_SUCCESS" });
                })
                .catch((err) => {
                  dispatch({ type: "SELL_FAILURE", err });
                });
            })
            .catch((err) => {
              dispatch({ type: "SELL_FAILURE", err });
            });
        });
      })
      .catch((err) => {
        dispatch({ type: "SELL_FAILURE", err });
      });
  };
};

export const sellPartOfStock = (stock) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    var d = new Date();
    firestore
      .collection("usersInfo")
      .doc(userId)
      .collection("stocks")
      .where("symbol", "==", stock.symbol)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .update({
              amount: stock.remainAmount,
              value: stock.remainAmount * stock.buyPrice
            })
            .then(() => {
              firestore
                .collection("usersInfo")
                .doc(userId)
                .collection("salesRecord")
                .add({
                  symbol: stock.symbol,
                  amount: stock.sellAmount,
                  buyPrice: stock.buyPrice,
                  sellPrice: stock.sellPrice,
                  time: d,
                })
                .then(() => {
                  dispatch({ type: "UPDATE_SUCCESS" });
                })
                .catch((err) => {
                  dispatch({ type: "UPDATE_FAILURE", err });
                });
            })
            .catch((err) => {
              dispatch({ type: "UPDATE_FAILURE", err });
            });
        });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_FAILURE", err });
      });
  };
};

export const checkSymbol = (symbol) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log(symbol);
    getSymbolPrice(symbol)
      .then((body) => {
        console.log(body.express);
        dispatch({ type: "CHECK_SYMBOL_SUCCESS" });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "CHECK_SYMBOL_FAILURE", err });
      });
  };
};

export const getSymbolPrice = async (symbol) => {
  const response = await fetch("/express_backend/" + symbol);
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

export const getSymbolGraph = async (symbol) => {
  const response = await fetch("/express_backend/canvas/" + symbol);
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

export const getCurrency = async () => {
  const response = await fetch("/express_backend/currency/asda");
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};
