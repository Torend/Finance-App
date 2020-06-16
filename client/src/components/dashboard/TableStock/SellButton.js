import React, { Component } from "react";
import { connect } from "react-redux";
import ReactModal from "react-modal";

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
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="container">
        <a
          onClick={this.handleOpenModal}
          class="waves-effect btn-small"
          style={{ height: 25, backgroundColor: "gray" }}
        >
          <p style={{ color: "white" }}>Sell</p>
        </a>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Sell"
          style={customStyles}
        >
         <div className="container" style={{width: 450}}>
         <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">
          <i className="material-icons prefix">trending_up</i>
              Sell Stock
          </h5>
          <div className="input-field">
            <label htmlFor="symbol">Symbol</label>
            <input type="text" id="symbol" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="price">Price</label>
            <input type="text" id="price" onChange={this.handleChange} />
          </div>
          <div className="input-field">
          <button className="btn green lighten-0 z-depth-2" type="submit" name="action">ADD</button>     
          </div>
        </form>
            <button onClick={this.handleCloseModal}>Close Modal</button>
         </div>
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(SellButton);
