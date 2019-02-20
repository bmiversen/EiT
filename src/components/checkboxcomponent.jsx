import React, { Component } from "react";

class CheckboxComponent extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
            <label htmlFor={this.props.id}>{this.props.checkboxText}</label>
            <input type="checkbox" id={this.props.id} onChange={this.props.handleChange}/>
            </React.Fragment>
          );
    }
}
 
export default CheckboxComponent;