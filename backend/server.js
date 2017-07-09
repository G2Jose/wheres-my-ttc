const rb = require('restbus');
const app = require('express')();
const redis = require('redis');

const redisClient = redis.createClient();

// Get data from redis given a key
const getKey = (key) => new Promise((resolve, reject) => {
	redisClient.get(key, (error, result) => {
		if (!error && result) resolve(result);
		else reject(error);
	});
});

// Set value for a key in redis with a given expiry
const setKey = (key, val, expiry = 5) => {
	let str = ''
	if (typeof val === 'string') str = val;
	else str = JSON.stringify(val);
	redisClient.setex(key, expiry, str);
}

// Make the API callable from anywhere
const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
	next();
}

app.use(corsMiddleware);

// Middleware to check if a value was stored in redis
app.use((req, res, next) => {
	getKey(req.url)
	.then((val) => {
		console.info('found in cache');
		// Return cached data
		res.json(JSON.parse(val));
	})
	.catch((error) => {
		console.info('Not found in cache');
		const json = res.json;
		// Override the res.json function to do more than just return json
		res.json = function(...args) {
			if (typeof args[1] === 'object' && args[1].length) {
				 // Remove all unnecessary data and only return some fields
				args[1] = args[1].map(item => {
					return {
						id: item.id,
						routeId: item.routeId,
						secsSinceReport: item.secsSinceReport,
						lat: item.lat,
						lon: item.lon,
					}
				})
			}
			// Also cache the response
			setKey(req.url, args[1]);
			json.call(this, ...args);
		};
		next();
	})
});

app.use('/', rb.app);

app.listen(3000);