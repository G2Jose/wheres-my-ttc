import React from "react";
import MapGL from "react-map-gl";

import Marker from "./Marker.js";
import Legend from "./Legend.js";
import Info from "./Info.js";

import { $vehicles } from "../utils/api.js";
import { getRgbForValue } from "../utils/color.js";

class InteractiveMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 43.6536025,
        longitude: -79.4004877,
        zoom: 13,
        width: this.props.width,
        height: this.props.height,
        startDragLngLat: null,
        isDragging: null
      },
      mapStyle: "mapbox://styles/mapbox/dark-v9",
      xy: []
    };
  }

  componentDidMount() {
    $vehicles.subscribe(data => {
      this.setState({ xy: data });
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        this._recenterIfToronto(position.coords)
      );
    } else {
      console.log("nope");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.height) {
      const newState = this.state;
      newState.viewport.height = nextProps.height;
      this.setState(newState);
    }
    if (nextProps.width) {
      const newState = this.state;
      newState.viewport.width = nextProps.width;
      this.setState(newState);
    }
  }

  _recenter = coordinates => {
    const { latitude, longitude } = coordinates;
    const newViewport = { latitude, longitude };
    const viewport = Object.assign({}, this.state.viewport, newViewport);
    this.setState({ viewport });
  };

  _recenterIfToronto = coordinates => {
    if (
      coordinates.longitude <= -79.097489 &&
      coordinates.latitude <= 43.915783 &&
      coordinates.longitude >= -79.780606 &&
      coordinates.latitude >= 43.522938
    ) {
      console.log("Detected location in Toronto, recentering map");
      this._recenter(coordinates);
    } else {
      console.log("Detected location outside of Toronto, not recentering");
    }
  };

  _getBounds = () => {
    const rawBounds = this.map._getMap().getBounds();
    const bounds = {
      lat: {
        high: rawBounds._ne.lat,
        low: rawBounds._sw.lat
      },
      lon: {
        high: rawBounds._ne.lng,
        low: rawBounds._sw.lng
      }
    };
    return bounds;
  };

  _withinBounds = latLon => {
    return (
      latLon.lat >= this._getBounds().lat.low &&
      latLon.lat <= this._getBounds().lat.high &&
      latLon.lon >= this._getBounds().lon.low &&
      latLon.lon <= this._getBounds().lon.high
    );
  };

  _onChangeViewport = newViewport => {
    const viewport = Object.assign({}, this.state.viewport, newViewport);
    this.setState({ viewport });
  };

  render() {
    const { mapStyle, viewport } = this.state;
    return (
      <MapGL
        mapboxApiAccessToken="pk.eyJ1IjoiZ2Vqb3NlIiwiYSI6ImNqMm8xZTg5ZjAyNHYzM3FieW14eGxvaGMifQ.DlQAXVocu-c7yXDxdTQ-tA"
        onChangeViewport={this._onChangeViewport}
        mapStyle={mapStyle}
        ref={map => (this.map = map)}
        {...viewport}
      >
        {this.state.xy.filter(this._withinBounds).map((xy, i) => {
          return (
            <Marker
              xy={{ x: xy.lat, y: xy.lon }}
              color={getRgbForValue(xy.secsSinceReport)}
              key={i}
              text={xy.routeId}
            />
          );
        })}
        <Info />
        <Legend />
      </MapGL>
    );
  }
}

export default InteractiveMap;
