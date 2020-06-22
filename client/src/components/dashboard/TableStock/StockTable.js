import React, { Component } from "react";
import { connect } from "react-redux";
import StockTableRow from "./StockTableRow";
import TotalTableRow from "./TotalTableRow"

class StockTable extends Component {
  state = {};

  render() {
    return (
      <div
        style={{
          width: 1200,
          height: 325,
        }}
      >
        {this.props.stockList.length === 0 ? (
          <div
            style={{ height: 325, background: "white", 
            display : "flex",
            alignItems : "center",
            width:"93.5%",
            justifyContent: "center", }}
            className="blur-box-table"
          >
            <div style={{color: "gray"}}>
              <i
                className="material-icons prefix"
                style={{ fontSize: "50px", position: "relative", top: 0, left: 78 }}
              >
                timeline
              </i>
              <p>Sorry, this data is not available</p>
            </div>
          </div>
        ) : (
          <div
            style={{display: 'block', overflow: "auto", width:"93.5%", background: "white" }}
            className="blur-box-table"
          >
            <table class=" centered table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Symbol</th>
                  <th>Amount</th>
                  <th>Buy price</th>
                  <th>Return rate</th>
                  <th>Balance</th>

                  <th>Change %</th>
                  <th>Current price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.stockList.map((stock, i) => {
                  return <StockTableRow key={i} stock={stock} id={i+1} />;
                })}
                <TotalTableRow stockList={this.props.stockList} />
              </tbody>              
            </table>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    sellState: state.stock.sellState
  };
};

export default connect(mapStateToProps)(StockTable);

var styles = `
.blur-box-table {
  box-shadow: 0 2px 4px -2px rgba(0,0,0,0.4);
  max-height: 325px;
  margin-top: 50px;
},
.table-style {
  position: absolute;
  display: table-cell;
  vertical-align: middle;
}
`;
var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
