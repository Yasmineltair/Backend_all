const forecast = require("./weaterData/forecast");
const geocode = require("./weaterData/geocode");
// const country = process.argv[2];

// geocode(country, (error, data) => {
//   console.log("Error : ", error);
//   console.log("Data : ", data);

//   forecast(data.latitude, data.longtitude, (error, data) => {
//     console.log("Error : ", error);
//     console.log("Data : ", data);
//   });
// });

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");

//to access static pages

publicDir = path.join(__dirname, "../public");

app.use(express.static(publicDir));

//to access dynamic pages
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
  });
});

// app.get("/", (req, res) => {
//   res.send("Welcome to home pagesssss");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must input address",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    forecast(data.latitude, data.longtitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location: data.location,
        latitude: data.latitude,
        longtitude: data.longtitude,
        temperature: data.temperature,
      });
    });
  });
});

// app.get("*", (req, res) => {
//   res.send("404 Page not found");
// });

app.use((req, res) => {
  res.status(404).send("404 Page Not Found");
});

app.listen(port, () => {
  console.log("App is listening to port 5000");
});
