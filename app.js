const express = require("express");
const app = express();
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
const https = require("https");
require('dotenv').config();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("index");
});

app.post("/response", function(req, res) {

  var country = req.body.country;
  var city = req.body.city;
  const appId = process.env.API_KEY;
  var url = "https://api.openweathermap.org/data/2.5/weather?&q=" + country + "&q=" + city + "&appid=" + appId + "&units=metric"

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);

      var temp = weatherData.main.temp;
      var icon = weatherData.weather[0].icon;
      var imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
      var humidity =weatherData.main.humidity;
      var longitude = weatherData.coord.lon;
      var latitude = weatherData.coord.lat;
      var pressure = weatherData.main.pressure;
      var description = weatherData.weather[0].description;
      res.render('response', {imageUrl : imageUrl, longitude : longitude , latitude : latitude , humidity : humidity, pressure : pressure, temp : temp, description : description});

    });
  });

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server Started at Port 3000...");
});
