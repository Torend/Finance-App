import React, { Component } from "react";
import { connect } from "react-redux";


class SalesTableRow extends Component {
  state = {};


  profit = () => {
    let amount = parseFloat(this.props.stock.amount);
    let buyPrice = parseFloat(this.props.stock.buyPrice);
    let sellPrice = parseFloat(this.props.stock.sellPrice);
    let profit = (amount * (sellPrice - buyPrice));
    //this.setState({ profit: profit});
    return profit.toFixed(0);
  }

  returnRate = () => {
    let buyPrice = parseFloat(this.props.stock.buyPrice);
    let sellPrice = parseFloat(this.props.stock.sellPrice);
    let returnRate = ((sellPrice - buyPrice)/buyPrice)*100;
    return returnRate.toFixed(2);
  }

  getDate = () => {
    let year = this.props.stock.time.toDate().getFullYear();
    let month = this.props.stock.time.toDate().getMonth();
    let day = this.props.stock.time.toDate().getUTCDate();
    return day+'/'+month+'/'+year;
  }
 
  render() {
    const profit = this.profit();
    const returnRate = this.returnRate();
    const color = profit > 0 ? "green" : "red";
    const tax = (profit * 0.25).toFixed(2);
    const date = this.getDate();
    return (
      <tr>
        <td>{date}</td>
        <td>{this.props.stock.symbol}</td>
        <td>{this.props.stock.buyPrice+" / "+this.props.stock.sellPrice}</td>
        <td>{this.props.stock.amount}</td>
        <td style={{color: color}} >{returnRate+"%"}</td>
        <td>{profit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ "$"}</td>
        <td>{tax+'$'}</td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(SalesTableRow);
