const express = require("express");
const axios = require("axios");
const router = express.Router();
const path = require("path");
const Time = require("./../utils/Time");
const { convertDateToUnixTime } = require("./../utils/Time");

router.post("/current", (req, res, next) => {
  const lat = req.body.lat || "10.8331008";
  const lon = req.body.lon || "106.6696704";
  const units = "metric"; // sử dụng độ C
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
    )
    .then(function (response) {
      // handle success
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
    })
    .then(function () {
      // always executed
    });
});
router.get("/current", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/views/current.html"));
});
router.post("/daily", (req, res, next) => {
  const lat = req.body.lat || "10.8331008";
  const lon = req.body.lon || "106.6696704";
  const units = "metric";
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&lang=vi`
    )
    .then(function (response) {
      // handle success
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});
router.get("/daily", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/views/daily.html"));
});
router.post("/history", (req, res, next) => {
  const lat = req.body.lat || "10.8331008";
  const lon = req.body.lon || "106.6696704";
  const units = "metric";
  let time = req.body.time;
  time = time ? convertDateToUnixTime(time) : convertDateToUnixTime(new Date());
  console.log(time);
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&units=${units}&dt=${time}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&lang=vi`
    )
    .then(function (response) {
      // handle success
      let data = response.data;
      Time.mutateObjectProperty('dt', Time.convertUnixTimeToDate, data);
      res.send(data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});
router.get("/history", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/views/history.html"));
});
router.post("/country", (req, res, next) => {
  const countryName = req.body.countryName || "";
  const cityName = req.body.cityName || "";
  const units = "metric";
  
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&units=${units}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&lang=vi`
    )
    .then(function (response) {
     
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});
router.get("/country", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/views/country.html"));
});

module.exports = router;
