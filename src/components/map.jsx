import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./css/map.css";
import { getColor, sensorColors } from "./util/sensors";

class LeafletMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapid: "mapid",
      center: [63.43, 10.39],
      zoom: 14
    };
  }

  /**
   * Instantiates the map,
   * a featuregroup containing all layers,
   * a legend describing the color scheme.
   */
  componentDidMount() {
    this.map = this.createMap(this.state.mapid);
    this.map.sensorType = this.props.sensorType;
    this.map.sensorInterval = sensorColors[this.props.sensorType].interval;

    this.featureGroup = L.featureGroup();
    this.featureGroup.addTo(this.map);

    this.mapLegend = this.createLegend();
    this.mapLegend.addTo(this.map);

    //If this is not included, half the map is shown as grey until the window is resized.
    this.map.invalidateSize();
  }

  /**
   * Leaflet map constructor with Kartverket basemap
   * @param mapid, id of <div> the map will be placed in.
   */
  createMap(mapid) {
    const map = L.map(mapid).setView(this.state.center, this.state.zoom);
    L.tileLayer(
      "https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart_graatone&zoom={z}&x={x}&y={y}",
      {
        attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
      }
    ).addTo(map);
    map.zoomControl.setPosition("topright");
    return map;
  }

  /**
   * When new props are given.
   * Replaces points and legend with new ones with correct colors.
   */
  componentDidUpdate() {
    this.removeAllLayers();
    this.props.data.forEach(feature => {
      let leaflayer = this.getGeoJSONFeature(feature);
      this.featureGroup.addLayer(leaflayer);
    });
    this.mapLegend = this.createLegend();
    this.mapLegend.addTo(this.map);
  }

  /**
   * Create legend describing the color scheme for the given sensortype.
   */
  createLegend = () => {
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = map => {
      const div = L.DomUtil.create("div", "info legend");
      const interval = map.sensorInterval;

      div.innerHTML += "<strong>" + this.map.sensorType + "</strong><br>";
      //For the intervals, write interval limits and corresponding color
      for (let i = 0; i < interval.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          getColor(map.sensorType, interval[i + 1]) +
          '"></i>' +
          interval[i] +
          (interval[i + 1] ? "&ndash;" + interval[i + 1] + "<br>" : "+");
      }
      return div;
    };
    return legend;
  };

  /**
   * Removes all points and the legend from the map.
   */
  removeAllLayers = () => {
    this.featureGroup.clearLayers();
    this.map.removeControl(this.mapLegend);
  };

  /**
   * Makes the geojson feature ready to be displayed on the map.
   */
  getGeoJSONFeature = feature => {
    return L.geoJSON(feature, {
      pointToLayer: this.pointToLayer,
      onEachFeature: this.onEachFeature
    });
  };

  /**
   * Converts a geojson point to a circlemarker
   */
  pointToLayer = (feature, latlng) => {
    return L.circle(
      latlng,
      this.getCircleMarkerOptions(this.props.sensorType, feature)
    );
  };

  /**
   * Describes how the circle will look
   */
  getCircleMarkerOptions = (sensorType, feature) => {
    const color = getColor(sensorType, feature.properties[sensorType]);
    return {
      radius: 15,
      fillColor: color,
      color: "#d3d3d3",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
  };

  /**
   * Popup describing each feature on the map. Contains time and the filtered sensorType
   */
  createPopupText = properties => {
    return `Time: ${properties.time}\n 
    ${this.props.sensorType}: ${properties[this.props.sensorType]}`;
  };

  /**
   * Adds a popup when the user clicks on a feature
   */
  onEachFeature = (feature, layer) => {
    if (feature.properties) {
      layer.bindPopup(this.createPopupText(feature.properties));
    }
  };

  render() {
    return <div id={this.state.mapid} />;
  }
}

export default LeafletMap;
