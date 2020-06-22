import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {addStock, addSuccess, addExistStock} from "../../store/actions/stockActions";
import firebase from "../../config/firebaseConfig";


class AddStock extends Component {
  state = {
    symbol: "",
    amount: "",
    price: "",
    submit: null,
    stockList: [],
  };

  componentDidMount() {
    const db = firebase.firestore();
    db.collection("usersInfo")
      .doc(this.props.auth.uid)
      .collection("stocks")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          let stocks = [];
          querySnapshot.forEach((doc) => {
            stocks.push(doc.data());
          });
          this.setState({ stockList: stocks });
        }
        else
            this.setState({ stockList: []});
      })
      .catch(function (error) {
        console.log("Error getting document: ", error);
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if(!(this.state.symbol === "" || this.state.amount === "" || this.state.price === "")){
      this.setState({submit: null})
      let exists = this.state.stockList.filter(x => x.symbol === this.state.symbol)
      console.log(exists);
      if(exists.length > 0){
        let oldAmount = parseInt(exists[0].amount);
        let newAmount = parseInt(this.state.amount);
        let oldPrice = parseFloat(exists[0].price);
        let newPrice = parseFloat(this.state.price);
        this.props.addExistStock({
          symbol: this.state.symbol,
          newAmount: (oldAmount + newAmount),
          newPrice: (((oldAmount * oldPrice) + (newAmount * newPrice))/(oldAmount + newAmount)).toFixed(2) //average price
        })
      }
      else
        this.props.addStock(this.state)
    }
    else this.setState({submit: "You must fill in all the required fields"})
  };

  render() {
    const { auth, addState } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    if (this.props.addState === "Add Success"){
      this.props.addSuccess();
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">
          <i className="material-icons prefix">trending_up</i>
              Add Stock
          </h5>
          <div className="input-field">
            <label htmlFor="symbol">Symbol</label>
            <input type="text" id="symbol" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="price">Price</label>
            <input type="text" id="price" onChange={this.handleChange} />
          </div>
          <div className="input-field">
          <button className="btn green lighten-0 z-depth-2" type="submit" name="action">ADD</button>     
          <div className="center red-text">
              { addState ? <p>{addState}</p> : null }
              { this.state.submit ? <p>{this.state.submit}</p> : null }
          </div> 
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    addState: state.stock.addState
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStock: (newStock) => dispatch(addStock(newStock)),
    addSuccess: () => dispatch(addSuccess()),
    addExistStock: (stock) => dispatch(addExistStock(stock))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStock);
