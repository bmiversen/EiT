import React, { Component } from "react";
import { sensorTypes, sensorColors } from "./util/sensors";

class MapLegend extends Component {
  createColorIntervals = () => {
    const sensorColor = sensorColors[this.props.sensorType];
    const sensorInterval = sensorColor.interval;
    const colors = sensorColor.colors.slice();
    const intervals = [];
    //If we should have a color for values less than our smallest interval value
    if (sensorColor.beforeFirst) {
      let intervalText = "<" + sensorInterval[0];
      const firstInterval = this.createInterval(
        "first",
        colors.splice(0, 1),
        intervalText
      );
      intervals.push(firstInterval);
    }
    //Create colors for all intervals between two values
    for (let i = 0; i < sensorInterval.length - 1; i++) {
      let intervalText = sensorInterval[i] + "-" + sensorInterval[i + 1];
      const interval = this.createInterval(
        i,
        colors.splice(0, 1),
        intervalText
      );
      intervals.push(interval);
    }
    //If we should have a color for values greater than our largest interval value
    if (sensorColor.afterLast) {
      let intervalText = sensorInterval[sensorInterval.length - 1] + "<";
      const LastInterval = this.createInterval(
        "last",
        colors.splice(0, 1),
        intervalText
      );
      intervals.push(LastInterval);
    }
    return intervals;
  };

  createInterval = (key, color, intervalText) => {
    return (
      <div key={key} style={{ display: "table-row" }}>
        <div
          style={{
            background: color,
            width: "10px",
            height: "10px"
          }}
        />
        <span>{intervalText}</span>
      </div>
    );
  };

  createDropdownMenu = () => {
    const sensorOptions = [];
    for (const sensorType in sensorTypes) {
      const option = (
        <option key={sensorType} value={sensorTypes[sensorType]}>
          {sensorTypes[sensorType]}
        </option>
      );
      sensorOptions.push(option);
    }
    return sensorOptions;
  };

  render() {
    return (
      <div>
        <select
          value={sensorTypes[this.props.sensorType]}
          onChange={event => this.props.onSensorTypeChange(event)}
        >
          {this.createDropdownMenu()}
        </select>
        {this.createColorIntervals()}
      </div>
    );
  }
}

export default MapLegend;
