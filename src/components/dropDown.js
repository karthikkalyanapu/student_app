import React from "react";


class DropDown extends React.Component {
  constructor(props){
    super(props);
  }

	onChange = e => {
  	console.log("selected value for Year:", e.target.value);
    this.props.setYear(e.target.value);
  };
  getDropList = () => {
  	const year = new Date().getFullYear();
      
    return (
    	Array.from( new Array(50), (v,i) =>
      	<option key={i} value={year-i}>{year-i}</option>
      )
    );
  };
  render() {
    return (
      <div>
        <select 
        className = "drop-down"
        onChange={this.onChange}>
          {this.getDropList()}
        </select>
      </div>
    )
  }
}


export default DropDown;