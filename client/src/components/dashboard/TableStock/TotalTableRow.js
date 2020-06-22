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

  componentDidUpdate(prevProps) {
    if (prevProps.sellState !== this.props.sellState) {
      this.componentDidMount();
    }
  }

  returnRate = () => {
    let price = parseFloat(this.props.stock.price);
    let currntPrice = parseFloat(this.state.currntPrice);
    let returnRate = ((currntPrice - price) / price) * 100;
    return returnRate.toFixed(2);
  };

  render() {
    const totalBuyPrice = this.props.stockList.reduce((sum, stock) => {
      return sum + stock.amount * stock.price;
    }, 0);
    const currntTotalPrice = this.state.currntTotalPrice
      .reduce((sum, stock) => {
        let x = this.props.stockList.filter(
          (stock_from_list) => stock.symbol === stock_from_list.symbol
        );
        if (x.length > 0) return sum + stock.price.express * x[0].amount;
        else return 0;
      }, 0)
      .toFixed(2);
    const totalReturnsRate = (
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
            {currntTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
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
