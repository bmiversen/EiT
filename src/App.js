import React, { Component } from "react";
import LeafletMap from "./components/map";
import SidebarComponent from "./components/sidebar";
import "./App.css";
import testData from "./testdata.json";

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
  }
  componentDidMount() {
    this.readData(JSON.stringify(testData));
  }

  handleSubmit = (event, form) => {
    event.preventDefault();
    this.setState({form: form});
  };

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
        <SidebarComponent
          handleSubmit={this.handleSubmit}
        />
        <LeafletMap data={this.state.data} asPoints={true} />
      </React.Fragment>
    );
  }
}

export default App;
