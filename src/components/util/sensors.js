/**
 * Object containing all sensor types we have data for.
 * Each sensor type must have a corresponding function for obtaining the color
 */
export const sensorTypes = {
  airQuality: "airQuality"
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
  airQuality: {
    interval: [0, 50, 100, 150, 200, 300],
    colors: ["#00ff00", "#ffff00", "#ffa500", "#ff0000", "#800080", "#660000"]
  }
};
