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
    const request = require("request");
    request("http://52.164.189.113/api/datapoints/", (
      error, response,  body) => {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the HTML for the Google homepage.
      this.setState({data: body.features})
      console.log(this.state.data)
    });
  }

  handleSubmit = (event, form) => {
    event.preventDefault();
    this.setState({ form: form });
  };

  readData = layers => {
    let data = layers;
    this.setState({
      data: data
    });
  };

  render() {
    console.log(this.state.data);
    return (
      <React.Fragment>
        <SidebarComponent handleSubmit={this.handleSubmit} />
        <LeafletMap data={this.state.data} asPoints={true} />
      </React.Fragment>
    );
  }
}

export default App;
