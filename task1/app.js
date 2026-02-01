// request = require("request");
// const url =
//   "https://api.weatherapi.com/v1/current.json?key=a0a80685cb6640eea9942625252611&q=30.05,31.25";
// request({ url, json: true }, (error, response) => {
//   console.log(response.body.location.name);
//   console.log(response.body.current.condition.text);
// });

const forecast = require("./data/forecast");
const geocode = require("./data/geocode.js");
const prompt = require("prompt-sync")();
const country = prompt("enter country name:");

geocode(country, (error, data) => {
  // console.log("Error : ", error);
  // console.log("Data :", data);

  forecast(data.latitude, data.longtitude, (error, data) => {
    console.log("Error: ", error);
    console.log("Data: ", data);
  });
});
