require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());

// Routes init
route(app);

const PORT = process.env.PORT || 5000;

// Server listen on port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
