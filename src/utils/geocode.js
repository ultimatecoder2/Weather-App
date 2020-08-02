const request = require('request');
//To get longitude and lattitude of a location we use GEO API
const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGoxMjMiLCJhIjoiY2tiNjV0ZWk3MDNiNTJ0bW51NWZtcDZ4cSJ9.hBUU4gxzbBFj3uB02gFsKw";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);

        } else {

            const locations = body.features;
            const longitude = locations[0].center[0];
            const lattitude = locations[0].center[1];
            const location = locations[0].place_name;
            callback(undefined, {
                lattitude: lattitude,
                longitude: longitude,
                location: location
            });
        }

    });
};

module.exports = geoCode;