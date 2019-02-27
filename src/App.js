import React, { Component } from "react";
import LeafletMap from "./components/map";
import Sidebar from "./components/sidebar";
import "./App.css";
import testData from "./testdata.json";
import { sensorTypes } from "./components/util/sensors";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], dataType: null, gpsPoints: true };
  }
  componentDidMount() {
    this.readData(JSON.stringify(testData));
  }

  readData = layers => {
    let data = JSON.parse(layers);
    this.setState({
      data: data.features,
      dataType: sensorTypes.airQuality
    });
  };

  render() {
    console.log(this.state.data);
    return (
      <React.Fragment>
        <Sidebar />
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
