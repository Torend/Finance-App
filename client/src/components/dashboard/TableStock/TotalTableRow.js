import React, { Component } from "react";
import { connect } from "react-redux";
import { getSymbolPrice } from "../../../store/actions/stockActions";

class TotalTableRow extends Component {
  state = {
    currntTotalPrice: [],
  };

  componentDidMount() {
    this.setState({ currntTotalPrice: [] });
    this.props.stockList.forEach((stock) => {
      getSymbolPrice(stock.symbol).then((price) => {
        this.setState({
          currntTotalPrice: this.state.currntTotalPrice.concat({
            symbol: stock.symbol,
            price: price,
          }),
        });
      });
    });
  }

  totalBuyPrice = () => {
    return this.props.stockList.reduce((sum, stock) => {
      return sum + stock.amount * stock.price;
    }, 0)
    .toFixed(2);
  }

  currntTotalPrice = () => {
    return this.props.stockList
    .reduce((sum, stock)=>{
      let currntPrice = this.state.currntTotalPrice
      .filter((stock_from_list)=> stock.symbol === stock_from_list.symbol)
      if (currntPrice.length > 0) return sum + stock.amount * currntPrice[0].price.express;
      else return 0;
    }, 0)
    .toFixed(2);
  }

  render() {
    let totalBuyPrice = this.totalBuyPrice();
    let currntTotalPrice = this.currntTotalPrice();
    let totalReturnsRate = (
      ((currntTotalPrice - totalBuyPrice) / totalBuyPrice) *
      100
    ).toFixed(2);

    const color = totalReturnsRate > 0 ? "#56C37B" : "#C45959";
    return (
      <tr style={{ backgroundColor: color }}>
        <th></th>
        <th></th>
        <td>
          <b>Total</b>
        </td>
        <td>
          <b>
            {totalBuyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              "$"}
          </b>
        </td>
        <td>
          <b>{totalReturnsRate}%</b>
        </td>
        <td>
          <b>
            {(currntTotalPrice - totalBuyPrice).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              "$"}
          </b>
        </td>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sellState: state.stock.sellState,
  };
};

export default connect(mapStateToProps)(TotalTableRow);
