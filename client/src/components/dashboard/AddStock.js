import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {addStock, addSuccess} from "../../store/actions/stockActions";

class AddStock extends Component {
  state = {
    symbol: "",
    amount: "",
    price: "",
    submit: null
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if(!(this.state.symbol === "" || this.state.amount === "" || this.state.price === "")){
      this.setState({submit: null})
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
    addSuccess: () => dispatch(addSuccess())
    //checkSymbol: (symbol) => dispatch(checkSymbol(symbol))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStock);
