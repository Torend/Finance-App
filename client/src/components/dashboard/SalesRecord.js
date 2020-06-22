import React, { Component } from "react";
import { connect } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import DefaultTooltipContent from "recharts/lib/component/DefaultTooltipContent";

class SalesRecord extends Component {
  state = { acc: 0 };

  getDate = (stock) => {
    let year = stock.time.toDate().getFullYear();
    let month = stock.time.toDate().getMonth();
    let day = stock.time.toDate().getUTCDate();
    return day + "/" + month + "/" + year;
  };

  getProfit = (stock) => {
    let amount = parseFloat(stock.amount);
    let buyPrice = parseFloat(stock.buyPrice);
    let sellPrice = parseFloat(stock.sellPrice);
    let profit = amount * (sellPrice - buyPrice);
    //this.setState({ profit: profit});
    return profit.toFixed(0);
  };

  accumulateProfit = (amount) => {
    let res = this.state.acc;
    this.setState({ acc: amount + res });
    return res;
  };

  render() {
    const CustomTooltip = (props) => {
      if (props.payload[0] != null) {
        const newPayload = [
          {
            name: "Symbol",
            value: props.payload[0].payload.symbol,
          },
          {
            name: "Sale",
            value: props.payload[0].payload.saleProfit+'$',
          },
          ...props.payload,
        ];
        return <DefaultTooltipContent {...props} payload={newPayload} />;
      }
      return <DefaultTooltipContent {...props} />;
    };
    let year = new Date(parseInt(this.props.auth.createdAt)).getFullYear();
    let month = new Date(parseInt(this.props.auth.createdAt)).getMonth();
    let day = new Date(parseInt(this.props.auth.createdAt)).getUTCDate()
    let date = day + "/" + month + "/" + year;
    const data = [{
      date: date,
      profit: 0,
    }];
    let accProfit = 0;
    this.props.salesRecord.forEach((saleRecord) => {
      accProfit = parseInt(this.getProfit(saleRecord)) + accProfit;
      data.push({
        date: this.getDate(saleRecord),
        profit: accProfit,
        symbol: saleRecord.symbol,
        saleProfit: this.getProfit(saleRecord),
      });
    });
    return (
      <div className="blur-box" style={{ width: 550, background: "white" }}>
        {this.props.salesRecord.length === 0 ? (
          <div
            style={{
              height: 550,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="blur-box text-center"
          >
            <div style={{ color: "gray" }}>
              <i className="material-icons prefix" style={{ fontSize: "50px" }}>
                timeline
              </i>
              <p>Sorry, this data is not available</p>
            </div>
          </div>
        ) : (
          <div style={{ height: 550 }} className="blur-box text-center">
            <LineChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="profit" />
              <Tooltip content={CustomTooltip} />
              <Legend dataKey="sale" />
              <ReferenceLine y={0} />

              <Line
                type="monotone"
                dataKey="profit"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(SalesRecord);
