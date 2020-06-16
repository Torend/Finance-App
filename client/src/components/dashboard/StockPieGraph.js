import React, { Component } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.symbol}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Value ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ "$"}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#4fc3f7", "#9575cd "];

class StockPieGraph extends Component {
  state = {
    activeIndex: 0,
  };


  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <div className="blur-box" style={{width: 550}}>
        {this.props.stockList.length === 0 ? (
          <div
            style={{ background: "white", 
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
    <div className="blur-box" style={{ width: 550}}>
      <div class="text-center" style={{position: "relative",top: -60 }}>
        <h5 class="card-title">Shares chart</h5>
      </div>     
      <PieChart width={550} height={700} margin={{ top: -68, right: 5, bottom: 5, left: 75}}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={this.props.stockList}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={this.onPieEnter}
        >
          {this.props.stockList.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
        </div>
        )}
      </div>
    );
  }
}

export default StockPieGraph;

var styles = `
.blur-box {
  box-shadow: 0 2px 4px -2px rgba(0,0,0,0.4);
  background-color: white;
  max-height: 350px;
  margin-top: 75px;
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
