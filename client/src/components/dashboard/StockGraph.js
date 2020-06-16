import React, { Component } from "react";
import { connect } from "react-redux";
import {getSymbolGraph} from "../../store/actions/stockActions"

class SockGraph extends Component {
  state = {
    canvas: null,
  };

  componentDidMount() {
    
  }

  

  render() {
    return (
        <div className="blur-box" style={{width: 550, background: "white"}}>
        {this.props.stockList.length === 0 ? (
          <div
            style={{height: 550,
            display : "flex",
            alignItems : "center",
            justifyContent: "center", }}
            className="blur-box text-center"
          >
            <div style={{color: "gray"}}>
              <i
                className="material-icons prefix"
                style={{ fontSize: "35px" }}
              >
                timeline
              </i>
              <p>Sorry, this data is not available</p>
            </div>
          </div>
        ) :(
    <div className="blur-box" style={{width: 550}}>

    </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(SockGraph);


var styles = `
.blur-box {
  box-shadow: 0 2px 4px -2px rgba(0,0,0,0.4);
  background-color: white;
  display:inline-block;
},
`;
var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
