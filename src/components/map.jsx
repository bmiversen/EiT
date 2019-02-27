import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./css/map.css";
import { getColor } from "./util/sensors";

class LeafletMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapid: "mapid",
      center: [63.43, 10.39],
      zoom: 14
    };
  }

  /*
TODO:
Clustering of points when zooming
Use featuregroups for points and polygons
Add legend describing the map
*/

  /**
   * Instantiates the map and the featuregroup containing all layers
   */
  componentDidMount() {
    this.map = this.createMap(this.state.mapid);
    //this.markers = L.markerClusterGroup();
    //this.map.addLayer(this.markers);
    //this.featuregroup = L.featureGroup();
    //this.featuregroup.addTo(this.map);

    //If this is not included, half the map is shown as grey until the window is resized.
    this.map.invalidateSize();
  }

  /**
   * Leaflet map constructor with Kartverket basemap
   * @param mapid, id of <div> the map will be placed in
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
   * When the props are updated
   */
  componentDidUpdate() {
    this.removeAllLayers();
    this.props.data.forEach(feature => {
      let leaflayer = this.getGeoJSONFeature(feature);
      if (this.props.gpsPoints) {
        //leaflayer.addTo(this.markers);
      } else {
        //TODO: Could use featuregroup here instead
      }
      leaflayer.addTo(this.map);
    });
  }

  /**
   * Removes all points from the map
   */
  removeAllLayers = () => {
    //this.markers.clearLayers();
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
    return L.circleMarker(
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
      radius: 8,
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
