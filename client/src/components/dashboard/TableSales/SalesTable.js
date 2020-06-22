import React, { Component } from "react";
import { connect } from "react-redux";
import SalesTableRow from "./SalesTableRow"

class SalesTable extends Component {
 

  render() {
    this.props.salesRecord.sort(function(x, y){
      return x.time - y.time;
  })
    return (
      <div className="blur-box" style={{width: 550, background: "white"}}>
        {this.props.salesRecord.length === 0 ? (
          <div
            style={{ height: 550,
            display : "flex",
            alignItems : "center",
            justifyContent: "center", }}
            className="blur-box text-center"
          >
            <div style={{color: "gray"}}>
              <i
                className="material-icons prefix"
                style={{ fontSize: "50px" }}
              >
                timeline
              </i>
              <p>Sorry, this data is not available</p>
            </div>
          </div>
        ) : (
          <div
            style={{ height: 550, }}
            className="blur-box"
          >
            <div class="text-center" style={{position: "relative", top: -40, height:30}}>
              <h5 class="card-title">Sales Record</h5>
            </div>
            <table class=" centered table-hover" style={{position: "relative",top:-40, overflow:"hidden", height:"100px"}}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Stock</th>
                  <th>Buy/Sale price</th>
                  <th>Amount</th>
                  <th>Return rate</th>
                  <th>Profit</th>
                  <th>Tax</th>
                </tr>
              </thead>
              <tbody>
              {this.props.salesRecord.map((stock, i) => {
                  return <SalesTableRow key={i} stock={stock} id={i+1} />;
                })}
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
    sellState: state.stock.sellState
  };
};

export default connect(mapStateToProps)(SalesTable);
