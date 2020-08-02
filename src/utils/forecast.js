// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require('request');

const forecast = (lattitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/e6af5b5feb891b272e18f5e2fc0370a6/" + lattitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        //destructured the body property of response
        if (error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = body;
            //if we don 't write json:true in request arguments then we need to replace above
            //line by:
            //const data = JSON.parse(body)
            //console.log(data.currently);
            const str = (data.currently.summary + " It is currently " + data.currently.temperature + " farnheit outside and there are " + (data.currently.precipProbability * 100) + "% chances of rain");
            callback(undefined, str);
        }
    });
};


module.exports = forecast;