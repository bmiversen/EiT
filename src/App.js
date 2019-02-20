import React, { Component } from "react";
import "./App.css";
import Map from "./components/map";
import Sidebar from "./components/sidebar";
import Modalview from "./components/nameless"

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Map />
        <Sidebar />
        <Modalview />
      </React.Fragment>
    );
  }
}

export default App;
