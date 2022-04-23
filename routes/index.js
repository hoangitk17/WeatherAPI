const homeRouter = require('./home');
const openweathermapRouter = require('./openweathermap');

function route(app) {
  app.use('/openweathermap', openweathermapRouter);
  app.use('/', homeRouter);
}

module.exports = route;
