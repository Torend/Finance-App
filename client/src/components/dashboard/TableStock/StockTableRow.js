import React, { Component } from "react";
import { connect } from "react-redux";
import {getSymbolPrice} from "../../../store/actions/stockActions"
import SellButton from "./SellButton"

class StockTableRow extends Component {
  state = {
      currntPrice: "",
      currntRate: " ",
  };

  componentDidMount() {
    this.interval = setInterval(() => {
        getSymbolPrice(this.props.stock.symbol).
        then(stock => {
            this.setState({currntPrice: stock.express});
            this.setState({currntRate: stock.rate});
    })
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  balance = () => {
    let amount = parseFloat(this.props.stock.amount);
    let price = parseFloat(this.props.stock.price);
    let currntPrice = parseFloat(this.state.currntPrice);
    let balance = (amount * (currntPrice - price));
    //this.setState({ balance: balance});
    return balance.toFixed(0);
  }

  returnRate = () => {
    let price = parseFloat(this.props.stock.price);
    let currntPrice = parseFloat(this.state.currntPrice);
    let returnRate = ((currntPrice - price)/price)*100;
    return returnRate.toFixed(2);
  }

  render() {
    const balance = this.balance();
    const returnRate = this.returnRate();
    const color = balance > 0 ? "green" : "red";
    let color_change = "red";
    if (this.state.currntRate)
        color_change = this.state.currntRate.charAt(0) === '+' ? "green" : "red";
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.stock.symbol}</td>
        <td>{this.props.stock.amount}</td>
        <td>{this.props.stock.price}</td>
        
        <td style={{color: color}} >{returnRate+"%"}</td>
        <td>{balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ "$"}</td>
        <td style={{color: color_change}} >{this.state.currntRate}</td>
        <td>{this.state.currntPrice}</td>
        <td><SellButton stock={this.props.stock}/></td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(StockTableRow);
