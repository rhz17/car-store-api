const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes and run routes
const carRoute = require("./routes/car");
app.use("/car", carRoute);

// Run error handling
const errorHandling = require("./services/error/errorHandling");
app.use(errorHandling);

module.exports = app;
