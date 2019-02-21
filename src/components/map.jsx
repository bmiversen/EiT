import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./css/map.css";

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

*/

  /**
   * Instantiates the map and the featuregroup containing all layers
   */
  componentDidMount() {
    this.map = this.createMap(this.state.mapid);
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
    this.props.data.forEach(feature => {
      let leaflayer = this.getGeoJSONFeature(feature);
      //TODO: Could use featuregroup here instead
      leaflayer.addTo(this.map);
    });
  }

  /**
   * Removes all points from the map
   */
  removeAllLayers = () => {
    return;
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
    return L.circleMarker(latlng, this.getCircleMarkerOptions(feature));
  };

  /**
   * Describes how the circle will look
   */
  getCircleMarkerOptions = feature => {
    const color = this.getMarkerColor(feature.properties);
    return {
      radius: 8,
      fillColor: color,
      color: color,
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
  };

  /**
   * Returns color corresponding to the air quality
   */
  getMarkerColor = properties => {
    const airQuality = properties.airQuality;
    if (airQuality < 50) {
      return "#00ff00";
    } else if (airQuality < 100) {
      return "#ffff00";
    } else if (airQuality < 150) {
      return "#ffa500";
    } else if (airQuality < 200) {
      return "#ff0000";
    } else if (airQuality < 300) {
      return "#800080";
    } else if (airQuality > 300) {
      return "#660000";
    }
  };
  //TODO: Should only show the property the user is filtering by
  createPopupText = properties => {
    return `Time: ${properties.time}\nAir quality: ${properties.airQuality}`;
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
