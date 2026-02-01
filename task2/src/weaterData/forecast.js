const request = require("request");
const { json } = require("stream/consumers");
const forecast = (latitude, longtitude, callback) => {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=a0a80685cb6640eea9942625252611&q=" +
    latitude +
    "," +
    longtitude;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(undefined, {
        location: response.body.location.name,
        temperature: response.body.current.temp_c,
        longtitude,
        latitude,
      });
    }
  });
};

module.exports = forecast;
