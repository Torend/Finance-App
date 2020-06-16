import React, { Component } from "react";
import { connect } from "react-redux";
import {getCurrency} from "../../store/actions/stockActions"

class ExchangeRateBar extends Component {
  state = {
    currency:{}
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      getCurrency().
        then(currency => {
            this.setState({currency: currency});
    })
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div style={{ width: 250, background: "#eeeeee", paddingTop: 50, marginBottom: 60}}>
          <table class="table table-hover">
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Exchange rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>USD/ILS</td>
                  <td>{this.state.currency.usd}</td>
                </tr>
                <tr>
                  <td>EUR/ILS</td>
                  <td>{this.state.currency.eur}</td>
                </tr>
                <tr>
                  <td>GBP/ILS</td>
                  <td>{this.state.currency.gbp}</td>
                </tr>
              </tbody>
            </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(ExchangeRateBar);

var styles = `
.currency {
  box-shadow: 0 2px 4px -2px rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-right: 200px;
},
`;
var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
