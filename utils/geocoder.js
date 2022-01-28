const NodeGeocoder = require('node-geocoder');

const options = {
    provider : process.env.GEOCODER_PROVIDER,
    httpAdapter : 'https',
    formatter: null,
    apiKey: process.env.GEOCODER_API_KEY
}

const geocoder = NodeGeocode(options);

module.exports = geocoder;