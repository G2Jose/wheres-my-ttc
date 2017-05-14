import React from 'react';
import MapGL from 'react-map-gl';

import Marker from './Marker.js';

class InteractiveMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			viewport: {
		        latitude: 43.6425690,
		        longitude: -79.3934600,
		        zoom: 15,
		        width: this.props.width,
		        height: this.props.height,
		        startDragLngLat: null,
		        isDragging: null
			},
			mapStyle: 'mapbox://styles/mapbox/dark-v9',
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
				<Marker xy={{x: 43.6425690, y: -79.3934600}} color="red" />
			</MapGL>
		);
	  }
}

export default InteractiveMap;
