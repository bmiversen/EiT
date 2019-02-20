import React, { Component } from "react";
import "./App.css";
import Map from "./components/map";
import Modalview from "./components/nameless"

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Map />
        <Modalview />
      </React.Fragment>
    );
  }
}

export default App;
