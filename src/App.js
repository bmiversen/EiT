import React, { Component } from "react";
import "./App.css";
import Map from "./components/map";
import Sidebar from "./components/sidebar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Map />
        <Sidebar />
      </React.Fragment>
    );
  }
}

export default App;
