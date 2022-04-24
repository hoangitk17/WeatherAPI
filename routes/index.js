const homeRouter = require('./home');
const openweathermapRouter = require('./openweathermap');
const meteoRouter = require('./meteo');

function route(app) {
  app.use('/openweathermap', openweathermapRouter);
  app.use('/meteo', meteoRouter);
  app.use('/', homeRouter);
}

module.exports = route;
