# Where's my TTC?

A near-realtime visualization of Toronto Transit Commission vehicles using [react-map-gl](https://github.com/uber/react-map-gl) & [nextbus API](https://www.nextbus.com)

Deployed at [https://georgejose.com/projects/livetransit/](https://georgejose.com/projects/livetransit/)

### Screenshots

<p align="center">
	<img src="https://raw.githubusercontent.com/G2Jose/wheres-my-ttc/master/screenshots/Screenshot-2.png"/>
</p>

### Features

- View locations of vehicles
- Click and drag to pan map
- Scroll to zoom
- Color indicator on all markers that range from red to green depending on when location was last updated

### Planned Features

- Optimize rendering further by only rendering markers that fall within a specific threshold of map bounds
- Mobile support using hammer.js
- Ability to enter an address
- Ability to toggle display of specific routes
