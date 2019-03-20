import React, { Component } from "react";
import LeafletMap from "./components/map";
import SidebarComponent from "./components/sidebar";
import "./App.css";
import { sensorTypes } from "./components/util/sensors";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sensorType: sensorTypes.temperature,
      form: {
        date: null,
        filterAirQuality: false
      }
    };
  }

  componentDidMount() {
    const request = require("request");
    request(
      "http://52.164.189.113/api/datapoints/",
      (error, response, body) => {
        const data = JSON.parse(body).features;
        this.setState({ data: data });
      }
    );
  }
  handleSensorTypeChange = event => {
    const sensorType = event.target.value;
    this.setState({ sensorType: sensorType });
  };

  handleSubmit = (event, form) => {
    event.preventDefault();
    this.setState({ form: form });
  };

  readData = layers => {
    let data = layers;
    this.setState({
      data: data.features
    });
  };

  render() {
    return (
      <React.Fragment>
        <SidebarComponent
          handleSubmit={this.handleSubmit}
          sensorType={this.state.sensorType}
          onSensorTypeChange={this.handleSensorTypeChange}
        />
        <LeafletMap data={this.state.data} sensorType={this.state.sensorType} />
      </React.Fragment>
    );
  }
}

export default App;
