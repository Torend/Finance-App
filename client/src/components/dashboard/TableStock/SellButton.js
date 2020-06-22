import React, { Component } from "react";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import { sellStock, sellPartOfStock } from "../../../store/actions/stockActions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

class SellButton extends Component {
  state = {
    showModal: false,
    amount: "",
    price: "",
  };

  componentDidMount() {
    ReactModal.setAppElement("body");
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(this.state.amount) === parseInt(this.props.stock.amount))
      this.props.sellStock({
        symbol: this.props.stock.symbol,
        buyPrice: this.props.stock.price,
        sellPrice: this.state.price,
        amount: this.state.amount,
      });
    else
      this.props.sellPartOfStock({
        symbol: this.props.stock.symbol,
        buyPrice: this.props.stock.price,
        sellPrice: this.state.price,
        sellAmount: this.state.amount,
        remainAmount: this.props.stock.amount - this.state.amount,
      });
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="container">
        <a
          onClick={this.handleOpenModal}
          class="waves-effect btn-small"
          style={{ height: 25, backgroundColor: "gray", zIndex: "auto" }}
        >
          <p style={{ color: "white" }}>Sell</p>
        </a>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Sell"
          style={customStyles}
        >
          <div className="container" style={{ width: 450 }}>
            <form className="white" onSubmit={this.handleSubmit}>
              <h5
                className="grey-text text-darken-3"
                style={{ position: "relative", top: -20 }}
              >
                <i className="material-icons prefix">trending_up</i>
                Sell Stock
              </h5>
              <div className="input-field">
                <input
                  type="text"
                  id="symbol"
                  value={this.props.stock.symbol}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="amount">
                  {"Amount (max: " + this.props.stock.amount + ")"}
                </label>
                <input
                  type="number"
                  id="amount"
                  onChange={this.handleChange}
                  max={this.props.stock.amount.toString()}
                />
              </div>
              <div className="input-field">
                <label htmlFor="price">Price</label>
                <input type="text" id="price" onChange={this.handleChange} />
              </div>
              <div className="input-field">
                <button
                  className="btn green lighten-0 z-depth-2"
                  type="submit"
                  name="action"
                >
                  SELL
                </button>
              </div>
            </form>
            <button
              onClick={this.handleCloseModal}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                background: "white",
              }}
            >
              <i className="material-icons prefix" style={{ fontSize: "16px" }}>
                close
              </i>
            </button>
          </div>
        </ReactModal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sellStock: (stock) => dispatch(sellStock(stock)),
    sellPartOfStock: (stock) => dispatch(sellPartOfStock(stock)),
  };
};

export default connect(null, mapDispatchToProps)(SellButton);
