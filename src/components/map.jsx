import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./css/map.css";

class LeafletMap extends Component {
  state = {
    mapid: "mapid",
    center: [63.43, 10.39],
    zoom: 14
  };
  /**
   * Instantiates the map and the featuregroup containing all layers
   */
  componentDidMount() {
    this.map = this.createMap(this.state.mapid);
    this.featuregroup = L.featureGroup();
    this.featuregroup.addTo(this.map);
    //If this is not included, half the map is shown as grey until a window resize.
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
  componentDidUpdate() {}

  render() {
    return <div id={this.state.mapid} />;
  }
}

export default LeafletMap;
