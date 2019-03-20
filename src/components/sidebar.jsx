import React, { Component } from "react";
import MapLegend from "./maplegend";

class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        date: null,
        filterAirQuality: false
      }
    };
  }

  handleDateChange = event => {
    const form = this.state.form;
    form.date = event.target.value;
    this.setState({ form: form });
  };

  handleCheckbox = () => {
    const form = this.state.form;
    form.filterAirQuality = !form.filterAirQuality;
    this.setState({ form: form });
  };

  render() {
    const divStyle = {
      position: "absolute",
      color: "white",
      background: "darkgray",
      width: "15vw",
      height: "100vh",
      marginLeft: "0",
      zIndex: "10"
    };
    return (
      <div className="sidebar-content" style={divStyle}>
        <form
          action=""
          onSubmit={e => {
            this.props.handleSubmit(e, this.state.form);
          }}
        >
          <div>
            <label htmlFor="input-date">Date to filter from</label>
            <input
              type="date"
              id="input-date"
              placeholder="dd/mm/yyyy"
              onChange={this.handleDateChange}
            />
          </div>
          <div>
            <label htmlFor="checkbox-air">Show air quality</label>
            <input
              type="checkbox"
              id="checkbox-air"
              onChange={this.handleCheckbox}
            />
          </div>
          <div>
            <input type="submit" value="Apply changes to analysis" />
          </div>
        </form>
        <MapLegend
          sensorType={this.props.sensorType}
          onSensorTypeChange={this.props.onSensorTypeChange}
        />
      </div>
    );
  }
}

export default SidebarComponent;
