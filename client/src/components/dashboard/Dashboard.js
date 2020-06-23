import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase from "../../config/firebaseConfig";
import StockTable from "./TableStock/StockTable";
import PieChart from "./StockPieGraph";
import GraphSalesRecord from "./GraphSalesRecord";
import ExchangeRateBar from "./ExchangeRateBar";
import SalesTable from "./TableSales/SalesTable";

class Dashboard extends Component {
  state = {
    stockList: [],
    salesRecord: [],
    sellState: null 
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

      db.collection("usersInfo")
      .doc(this.props.auth.uid)
      .collection("salesRecord")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          let sales = [];
          querySnapshot.forEach((doc) => {
            sales.push(doc.data());
          });
          this.setState({ salesRecord: sales });
        }
        else
            this.setState({ salesRecord: []});
      })
      .catch(function (error) {
        console.log("Error getting document: ", error);
      });
  }

  componentDidUpdate(prevProps){
    if(prevProps.sellState !== this.props.sellState){
       this.componentDidMount()
    }
}

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div class="overflow-hidden" style={{ marginLeft: 0 }}>
        <div class="d-flex justify-content-center">
          <div class="d-md-inline-flex" style={{marginLeft: -250}}>
            <StockTable stockList={this.state.stockList} />
          </div>
          <div class="d-md-inline-flex" style={{position: 'relative', left: 100}}>
            <ExchangeRateBar />
          </div>
        </div>
        <div
          class="d-flex justify-content-center"
          style={{ marginBottom: 100 }}
        >
          <div class="d-md-inline-flex" >
            <PieChart stockList={this.state.stockList} />
          </div>
          <div class="d-md-inline-flex" style={{ marginLeft: 25 }}>
            <SalesTable salesRecord={this.state.salesRecord} />
          </div>        
          <div class="d-md-inline-flex" style={{ marginLeft: 25 }}>
            <GraphSalesRecord salesRecord={this.state.salesRecord} />
          </div>
        </div>
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

export default connect(mapStateToProps)(Dashboard);
