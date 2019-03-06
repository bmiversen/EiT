/**
 * Object containing all sensor types we have data for.
 * Each sensor type must have a corresponding function for obtaining the color
 */
export const sensorTypes = {
  airQuality: "airQuality"
};

/**
 * Checks what sensor type we use and calls the relevant function
 */
export function getColor(sensorType, value) {
  return sensorType === sensorTypes.airQuality
    ? colorAirQuality(value)
    : "#000000";
}

/**
 * Colors for air quality
 */
function colorAirQuality(airQuality) {
  return airQuality <= 50
    ? "#00ff00"
    : airQuality <= 100
    ? "#ffff00"
    : airQuality <= 150
    ? "#ffa500"
    : airQuality <= 200
    ? "#ff0000"
    : airQuality <= 300
    ? "#800080"
    : "#660000";
}

/**
 * Scale of values. First is minimum value.
 * Rest of values are roof for respective color section.
 * Final value/color area goes to infinity.
 */
export const dataTypeIntervals = {
  airQuality: [0, 50, 100, 150, 200, 300]
};
