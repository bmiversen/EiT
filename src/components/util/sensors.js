/**
 * Object containing all sensor types we have data for.
 * Each sensor type must have a corresponding function for obtaining the color
 */
export const sensorTypes = {
  //airQuality: "airQuality"
  humidity: "humidity",
  temperature: "temperature",
  c02: "c02",
  voc: "voc"
};

/**
 * Returns the color corresponding to the sensor type and value
 */
export function getColor(sensorType, value) {
  const sensor = sensorColors[sensorType];
  for (let i = 0; i < sensor.interval.length; i++) {
    if (value <= sensor.interval[i + 1]) {
      return sensor.colors[i];
    }
  }
  //Returns either the color of the final interval, or black if there are no colors.
  return sensor ? sensor.colors[sensor.interval.length - 1] : "#000000";
}

/**
 * Describes the color scaling for a sensor type.
 * "interval" contains lower bound, and the upper bound for each color interval.
 * The final interval contains all values higher than the last value.
 * "colors" describes which color each interval has.
 */
export const sensorColors = {
  humidity: {
    interval: [0, 20, 40, 60, 80, 100],
    colors: ["#ccccff", "#8080ff", "#0000ff", "#0000cc", "#000080"],
    afterLast: false,
    beforeFirst: false
  },
  temperature: {
    interval: [-20, -10, 0, 10, 20, 30, 40],
    colors: [
      "#ffffff",
      "#0000ff",
      "#8080ff",
      "#ccccff",
      "#ffb3b3",
      "#ff1a1a",
      "#cc0000",
      "#00001a"
    ],
    afterLast: true,
    beforeFirst: true
  },
  c02: {
    interval: [200, 400, 600, 1000, 1600, 2600, 5000, 7000],
    colors: [
      "#f2ffe6",
      "#ccff99",
      "#00ff00",
      "#ffff00",
      "#ffa500",
      "#ff9999",
      "#ff0000",
      "#800080",
      "#660000"
    ],
    afterLast: true,
    beforeFirst: true
  },
  voc: {
    interval: [0, 50, 100, 150, 200, 300],
    colors: [
      "#e6ffe6",
      "#00ff00",
      "#ffff00",
      "#ffa500",
      "#ff0000",
      "#800080",
      "#660000"
    ],
    afterLast: true,
    beforeFirst: false
  }
};
