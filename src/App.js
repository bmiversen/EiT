import React, { Component } from "react";
import LeafletMap from "./components/map";
import Sidebar from "./components/sidebar";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <LeafletMap />
      </React.Fragment>
    );
  }
}

export default App;
