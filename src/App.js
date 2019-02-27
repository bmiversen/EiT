import React, { Component } from "react";
import LeafletMap from "./components/map";
import SidebarComponent from "./components/sidebar";
import "./App.css";
import { sensorTypes } from "./components/util/sensors";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        date: null,
        filterAirQuality: false
      },
      data: []
    };
    this.state = { data: [], dataType: null, gpsPoints: true };
  }
  componentDidMount() {
    const request = require("request");
    request(
      "http://52.164.189.113/api/datapoints/",
      (error, response, body) => {
        const data = JSON.parse(body).features
        this.setState({ data: data});
      }
    );
  }

  handleSubmit = (event, form) => {
    event.preventDefault();
    this.setState({ form: form });
  };

  readData = layers => {
    let data = layers;
    this.setState({
      data: data.features,
      dataType: sensorTypes.airQuality
    });
  };

  render() {
    return (
      <React.Fragment>
        <SidebarComponent handleSubmit={this.handleSubmit} />
        <LeafletMap
          data={this.state.data}
          dataType={this.state.dataType}
          gpsPoints={this.state.gpsPoints}
        />
      </React.Fragment>
    );
  }
}

export default App;
