import React from 'react';
import MapGL from 'react-map-gl';

import Marker from './Marker.js';
import { $vehicles, getVehicles, timer } from '../utils/api.js';
import { getRgbForValue } from '../utils/color.js';

class InteractiveMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			viewport: {
		        latitude: 43.719333,
		        longitude: -79.421078,
		        zoom: 11,
		        width: this.props.width,
		        height: this.props.height,
		        startDragLngLat: null,
		        isDragging: null
			},
			mapStyle: 'mapbox://styles/mapbox/dark-v9',
			xy: [],
		}
	}

	componentDidMount() {
		$vehicles
		.subscribe(data => {
			this.setState({
				xy: data
			});
		});
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

	_onChangeViewport = (newViewport) => {
	    const viewport = Object.assign({}, this.state.viewport, newViewport);
	    this.setState({viewport});
	}

	render() {
		
	    const {mapStyle, viewport} = this.state;
	    return (
	    	<MapGL
		    	mapboxApiAccessToken="pk.eyJ1IjoiZ2Vqb3NlIiwiYSI6ImNqMm8xZTg5ZjAyNHYzM3FieW14eGxvaGMifQ.DlQAXVocu-c7yXDxdTQ-tA"
				onChangeViewport={this._onChangeViewport}
				mapStyle={mapStyle}
				{...viewport}
			>
				{
					this.state.xy.map((xy, i) => {
						return (
							<Marker xy={{x: xy.lat, y: xy.lon}} color={getRgbForValue(xy.secsSinceReport)} key={i} text={xy.routeId} />
						);
					})
				}
			</MapGL>
		);
	  }
}

export default InteractiveMap;
