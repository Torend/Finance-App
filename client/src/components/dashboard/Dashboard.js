import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase from "../../config/firebaseConfig";
import StockTable from "./TableStock/StockTable";
import PieChart from "./StockPieGraph";
import StockGraph from "./StockGraph";
import ExchangeRateBar from "./ExchangeRateBar";

class Dashboard extends Component {
  state = { stockList: [] };

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
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document: ", error);
      });
  }

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div class="overflow-hidden" style={{ marginLeft: 250 }}>
        <div class="d-flex justify-content-center">
          <div class="d-md-inline-flex">
            <StockTable stockList={this.state.stockList} />
          </div>
          <div class="d-md-inline-flex">
            <ExchangeRateBar />
          </div>
        </div>
        <div
          class="d-flex justify-content-center"
          style={{ marginBottom: 100 }}
        >
          <div class="d-md-inline-flex">
            <StockGraph stockList={[]} />
          </div>
          <div class="d-md-inline-flex" style={{ marginLeft: 75 }}>
            <PieChart stockList={this.state.stockList} />
          </div>
          <div class="col-2"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Dashboard);

var styles = `

`;
var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
