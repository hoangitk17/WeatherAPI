const express = require("express");
const axios = require("axios");
const router = express.Router();
const path = require("path");

// https://open-meteo.com/en/docs
router.post("/daily", (req, res, next) => {
  const lat = req.body.lat || "10.8331008";
  const lon = req.body.lon || "106.6696704";
  axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia%2FTokyo`
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
router.get("/daily", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/views/meteo.html"));
});


module.exports = router;
