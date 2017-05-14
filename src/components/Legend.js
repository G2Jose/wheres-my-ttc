import React from 'react';

import './Legend.css';
import { MarkerSvg } from './Marker.js';
console.log(MarkerSvg)
const Legend = () => (
	<div className="legend">
		<h1 className="legend__title">
			Legend
		</h1>
		<div className="legend-line"><span><MarkerSvg color="#ff0000" />Stale data (30s or more)</span></div>
		<div className="legend-line"><span><MarkerSvg color="#00ff00" />Fresh data (&lt;5s)</span></div>

	</div>
);

export default Legend;
