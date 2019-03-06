import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./css/map.css";
import { getColor, dataTypeIntervals } from "./util/sensors";

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
    this.map.dataType = this.props.dataType;
    this.map.dataTypeInterval = dataTypeIntervals[this.props.dataType];

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
      const intervals = map.dataTypeInterval;

      div.innerHTML += "<strong>" + this.map.dataType + "</strong><br>";
      //For intervals, write interval limits and corresponding color
      for (let i = 0; i < intervals.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          getColor(map.dataType, intervals[i + 1]) +
          '"></i>' +
          intervals[i] +
          (intervals[i + 1] ? "&ndash;" + intervals[i + 1] + "<br>" : "+");
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
      this.getCircleMarkerOptions(this.props.dataType, feature)
    );
  };

  /**
   * Describes how the circle will look
   */
  getCircleMarkerOptions = (dataType, feature) => {
    const color = getColor(dataType, feature.properties[dataType]);
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
   * Popup describing each feature on the map. Contains time and the filtered datatype
   */
  createPopupText = properties => {
    return `Time: ${properties.time}\n 
    ${this.props.dataType}: ${properties[this.props.dataType]}`;
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
