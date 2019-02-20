import React, { Component } from "react";
import LeafletMap from "./components/map";
import Sidebar from "./components/sidebar";
import "./App.css";
import testData from "./testdata.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    this.readData(JSON.stringify(testData));
  }

  readData = layers => {
    let data = JSON.parse(layers);
    this.setState({
      data: data
    });
  };

  render() {
    console.log(this.state.data);
    return (
      <React.Fragment>
        <Sidebar />
        <LeafletMap data={this.state.data} asPoints={true} />
      </React.Fragment>
    );
  }
}

export default App;
