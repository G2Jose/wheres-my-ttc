import React from 'react';
import { Marker as RMarker } from 'react-map-gl';

import './Marker.css';

export const MarkerSvg = ({color}) => (
	<svg height="20" width="20">
	  <circle
	  	cx="10" cy="10" r="5" stroke="black" strokeWidth="0"
		fill={color}
	  />
	</svg>
);

class Marker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			latitude: 0,
			longitude: 0,
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.xy) {
			this._updateCoordinates(nextProps.xy.x, nextProps.xy.y);
		}
	}

	_updateCoordinates = (x, y) => {
		this.setState({
			latitude: x,
			longitude: y,
		})
	}

	render() {
		return (
			<RMarker
				latitude={this.state.latitude} longitude={this.state.longitude}
				offsetLeft={-20} offsetTop={-10}
			>
				<MarkerSvg color={this.props.color} />
				<div className="marker">
					{this.props.text}
				</div>
			</RMarker>
		);
	}
};

export default Marker;
