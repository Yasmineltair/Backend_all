const request = require("request");
const forecast = (latitude, longtitude, callback) => {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=a0a80685cb6640eea9942625252611&q=" +
    latitude +
    "," +
    longtitude;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connet to weatherapi website", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(undefined, {
        country: response.body.location.name,
        Latitude: response.body.location.lat,
        Longtitude: response.body.location.lon,
        condition: response.body.current.condition.text,
        temperature: response.body.current.temp_c,
      });
    }
  });
};

module.exports = forecast;
